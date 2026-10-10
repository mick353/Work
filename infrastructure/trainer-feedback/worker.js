
const ORIGIN='https://mick353.github.io';
const allowed={
feedbackStage:['During course creation','After course completion'],
courseProgress:['Planning/setup','Writing lessons/activities','Useful learner preview reached','Review/refinement','Learner export produced','Blocked'],
priorExperience:['First time','Limited','Several courses','Regular author'],
startingPoint:['Blank course','Clone existing course','Load previous draft','Other'],
materialReadiness:['Mostly prepared','Partly prepared','Largely from scratch'],
authoringTime:['Under 1 hour','1-3 hours','3-6 hours','6-12 hours','Over 12 hours'],
previewTime:['Under 30 minutes','30-60 minutes','1-2 hours','2-4 hours','Over 4 hours','Not yet reached'],
assistanceLevel:['None - independent','Minor guidance','Several points','Substantial hands-on','Unable to progress independently'],
assistanceDuration:['None','Under 15 minutes','15-30 minutes','30-60 minutes','Over 60 minutes'],
easeRating:['1 - Very difficult','2 - Difficult','3 - Neutral','4 - Easy','5 - Very easy'],
hardestStep:['Getting started','Course structure','Lesson content','Questions and scenarios','Sources and citations','Slides or media','Saving or transfer','Review checks','Preview or export','Nothing difficult','Other'],
usableOutput:['Partial course','Useful preview','Nearly complete for review','Learner-ready export','No usable output yet'],
independentNext:['Yes confidently','Probably with occasional guidance','Maybe with further training','No - substantial help needed','Too early to tell'],
featuresUsed:['Setup and outcomes','Lessons','Questions and scenarios','Assignments and review','Sources and citations','Slides and media','Cases and capstone','Draft saving or transfer','Learner preview','Validation checks','Learner export'],
problemsSeen:['Unclear navigation','Slow or freezing','Draft or save concerns','Document or media import','Confusing checks','Preview or export','Display or accessibility','No problems','Other']
};
const texts=['mainObstacle','mostHelpful','biggestImprovement','missingCapability'];
const requiredFields=['feedbackStage','courseProgress','authoringTime','previewTime','assistanceLevel','easeRating','independentNext'];
const multiFields=['featuresUsed','problemsSeen'];
function cors(){return {'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization','Vary':'Origin'};}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{...cors(),'Content-Type':'application/json;charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
async function handle(req){
 const url=new URL(req.url);
 if(url.pathname==='/health')return json({ok:true,service:'trainer-feedback',version:'1.0'});
 if(req.headers.get('Origin')!==ORIGIN) return json({error:'Forbidden origin'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors()});
 if(url.pathname==='/submit' && req.method==='POST'){
  if(!String(req.headers.get('Content-Type')||'').includes('application/json'))return json({error:'JSON required'},415);
  let data;try{const raw=await req.text();if(raw.length>16000)return json({error:'Submission too large'},413);data=JSON.parse(raw);}catch{return json({error:'Invalid JSON'},400);}
  if(typeof data!=='object'||!data||Array.isArray(data))return json({error:'Invalid form'},400);
  if(data.company_website)return json({ok:true,receipt:'Thank you'});
  if(typeof data.courseReference!=='string')return json({error:'Enter a valid course reference.'},400);
  const courseReference=data.courseReference.trim();
  if(!courseReference || courseReference.length>70)return json({error:'Enter a short, non-sensitive course reference (max 70 characters).'},400);
  for(const field of requiredFields){if(typeof data[field]!=='string'||!allowed[field].includes(data[field]))return json({error:'Complete the required field: '+field},400);}
  const clientId=data.submissionId;
  if(clientId!==undefined&&(typeof clientId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clientId)))return json({error:'Invalid submission identifier'},400);
  const id='response:'+(clientId||crypto.randomUUID());
  const row={courseReference,submittedAt:new Date().toISOString()};
  for(const [field,opts] of Object.entries(allowed)){
   const v=data[field];
   if(multiFields.includes(field)){
    if(v===undefined){row[field]=[];continue;}
    if(!Array.isArray(v)||v.length>opts.length||v.some(x=>typeof x!=='string'||!opts.includes(x))||new Set(v).size!==v.length)return json({error:'Invalid selection: '+field},400);
    if(field==='problemsSeen'&&v.includes('No problems')&&v.length>1)return json({error:'No problems cannot be combined with reported issues'},400);
    row[field]=v;
   }else if(v==null||v===''){if(requiredFields.includes(field))return json({error:'Complete the required field: '+field},400);row[field]='';}
   else if(typeof v!=='string'||!opts.includes(v))return json({error:'Invalid selection: '+field},400);
   else row[field]=v;
  }
  for(const field of texts){const v=data[field]??'';if(typeof v!=='string'||v.length>1400)return json({error:'Invalid text field: '+field},400);row[field]=v.trim();}
  row.id=id.slice(9);
  try{
   if(clientId){const existing=await FB_STORE.get(id,'json');if(existing)return json({ok:true,receipt:existing.id,submittedAt:existing.submittedAt,alreadyRecorded:true},200);}
   await FB_STORE.put(id,JSON.stringify(row));
  }catch(e){return json({error:'Could not store response. Please try again.'},503);}
  return json({ok:true,receipt:row.id,submittedAt:row.submittedAt},201);
 }
 if(url.pathname==='/results'&&req.method==='GET'){
  const key=await FB_STORE.get('config:review-key');
  if(!key||req.headers.get('Authorization')!=='Bearer '+key)return json({error:'Review key is incorrect'},401);
  // Page results to bound Worker KV subrequests and response payload size.
  const cursor=url.searchParams.get('cursor');
  if(cursor!==null&&(cursor.length>512||!/^[A-Za-z0-9+/_=-]*$/.test(cursor)))return json({error:'Invalid pagination cursor'},400);
  const page=await FB_STORE.list({prefix:'response:',limit:25,cursor:cursor||undefined});
  const records=(await Promise.all(page.keys.map(item=>FB_STORE.get(item.name,'json')))).filter(Boolean).sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt));
  return json({ok:true,count:records.length,records,more:!page.list_complete,nextCursor:page.list_complete?null:page.cursor});
 }
 return json({error:'Not found'},404);
}
addEventListener('fetch',event=>event.respondWith(handle(event.request).catch(e=>json({error:'Unexpected server error'},500))));
