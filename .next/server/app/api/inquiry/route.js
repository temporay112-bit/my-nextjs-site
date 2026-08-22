(()=>{var a={};a.id=693,a.ids=[693],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},41040:(a,b,c)=>{"use strict";c.d(b,{Gg:()=>i,Mf:()=>e,Ms:()=>f});let d=[{value:"golfwear",label:"Golfwear & Basics"},{value:"activewear",label:"Sportswear / Activewear"},{value:"teamwear",label:"Teamwear & Outerwear"},{value:"tracksuits",label:"Tracksuits & Warmups"},{value:"basics",label:"Basics & Essentials"},{value:"custom-oem-odm",label:"Custom OEM / ODM Project"},{value:"private-label",label:"Private Label Collection"},{value:"other",label:"Other Sportswear Requirement"}],e=0x1900000,f=["application/pdf","application/postscript","application/illustrator","image/vnd.adobe.photoshop","image/png","image/jpeg","image/webp","image/svg+xml","application/zip","application/x-zip-compressed","application/octet-stream"],g=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,h=/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{4,20}$/;function i(a){let b={};if(!a||"object"!=typeof a)return{isValid:!1,errors:{form:"Invalid request payload."}};let c="string"==typeof a.name?a.name.trim():"";c?c.length<2?b.name="Name must be at least 2 characters.":c.length>100&&(b.name="Name must not exceed 100 characters."):b.name="Please enter your name.";let e="string"==typeof a.email?a.email.trim().toLowerCase():"",f="string"==typeof a.phone?a.phone.trim():"";e||f?(e&&(g.test(e)?e.length>150&&(b.email="Email must not exceed 150 characters."):b.email="Please enter a valid business email address."),f&&(!h.test(f)||f.replace(/\D/g,"").length<6?b.phone="Please enter a valid phone or WhatsApp number.":f.length>30&&(b.phone="Phone number must not exceed 30 characters."))):(b.contact="Please provide either your business email or phone/WhatsApp number.",b.email="Please provide either your business email or phone/WhatsApp number.");let i="string"==typeof a.company?a.company.trim():"";i?i.length<2?b.company="Company name must be at least 2 characters.":i.length>100&&(b.company="Company name must not exceed 100 characters."):b.company="Please enter your company or brand name.";let j="string"==typeof a.productCategory?a.productCategory.trim():"",k=d.map(a=>a.value);j?k.includes(j)||(b.productCategory="Please select a valid product category from the list."):b.productCategory="Please select a product category.";let l="string"==typeof a.message?a.message.trim():"";l?l.length<5?b.message="Message must be at least 5 characters.":l.length>3e3&&(b.message="Message must not exceed 3000 characters."):b.message="Please tell us briefly about your project or order requirements.";let m="string"==typeof a.fileReference&&a.fileReference.trim()?a.fileReference.trim():null;return Object.keys(b).length>0?{isValid:!1,errors:b}:{isValid:!0,errors:{},data:{name:c,email:e||void 0,phone:f||void 0,company:i,productCategory:j,message:l,fileReference:m}}}},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:a=>{"use strict";a.exports=require("crypto")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},91648:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>P,patchFetch:()=>O,routeModule:()=>K,serverHooks:()=>N,workAsyncStorage:()=>L,workUnitAsyncStorage:()=>M});var d={};c.r(d),c.d(d,{POST:()=>J});var e=c(95736),f=c(9117),g=c(4044),h=c(39326),i=c(32324),j=c(261),k=c(54290),l=c(85328),m=c(38928),n=c(46595),o=c(3421),p=c(17679),q=c(41681),r=c(63446),s=c(86439),t=c(51356),u=c(10641),v=c(41040);let w=require("fs/promises");var x=c.n(w),y=c(33873),z=c.n(y),A=c(55511),B=c.n(A);let C=z().join(process.cwd(),"data"),D=z().join(C,"inquiries.json");async function E(){try{await x().mkdir(C,{recursive:!0})}catch{}}async function F(){await E();try{let a=await x().readFile(D,"utf-8");return JSON.parse(a)}catch{return[]}}async function G(a){await E();let b="inq-"+B().randomBytes(6).toString("hex")+"-"+Date.now(),c=new Date().toISOString(),d={id:b,name:a.name,email:a.email||null,phone:a.phone||null,companyName:a.company,productCategory:a.productCategory,message:a.message,fileReference:a.fileReference||null,status:"NEW",createdAt:c,updatedAt:c},e=await F();return e.unshift(d),await x().writeFile(D,JSON.stringify(e,null,2),"utf-8"),d}function H(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}async function I(a,b,c){let d=process.env.RESEND_API_KEY,e=process.env.QUOTE_RECEIVER_EMAIL||"shahrangujjar00@gmail.com",f=process.env.QUOTE_FROM_EMAIL||"SLOTS SPORTSWEAR <onboarding@resend.dev>";if(!d)return console.error("[Email Service Error]: RESEND_API_KEY is not configured in environment variables."),{success:!1,error:"Email service not configured."};let g=`New SLOTS SPORTSWEAR B2B Quote Request — ${a.company}`,h='<span style="color:#777777;">No file attached</span>',i="No file attached";if(a.fileReference){let b=a.fileReference,c=b.startsWith("http://")||b.startsWith("https://")?b:`/api/upload/file?pathname=${encodeURIComponent(b)}`,d=b.split("/").pop()||"Tech Pack";h=`
      <div>
        <span style="color:#FFFFFF;font-weight:bold;display:block;margin-bottom:6px;">${H(d)}</span>
        <a href="${H(c)}" target="_blank" rel="noopener noreferrer" 
           style="display:inline-block;padding:7px 16px;background-color:#2A2A2A;color:#B7FF00;font-size:12px;font-weight:bold;text-decoration:none;border-radius:6px;border:1px solid #B7FF00;">
          OPEN / DOWNLOAD TECH PACK &rarr;
        </a>
      </div>
    `,i=`${d} (${c})`}let j=[];a.email&&j.push(`
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;width:140px;">Business Email:</td>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#B7FF00;font-size:14px;">
          <a href="mailto:${H(a.email)}" style="color:#B7FF00;text-decoration:none;">${H(a.email)}</a>
        </td>
      </tr>
    `),a.phone&&j.push(`
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;width:140px;">Phone / WhatsApp:</td>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;font-weight:bold;">
          <a href="tel:${H(a.phone)}" style="color:#FFFFFF;text-decoration:none;">${H(a.phone)}</a>
        </td>
      </tr>
    `);let k=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${H(g)}</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#050505;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#171717;border-radius:12px;border:1px solid #2A2A2A;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding:28px 32px;background-color:#050505;border-bottom:2px solid #B7FF00;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:900;letter-spacing:2px;color:#FFFFFF;text-transform:uppercase;">
                      SLOTS <span style="color:#B7FF00;">SPORTSWEAR</span>
                    </div>
                    <div style="font-size:11px;color:#777777;letter-spacing:1px;text-transform:uppercase;margin-top:4px;">
                      B2B Manufacturing Inquiry Notification
                    </div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:4px 10px;background-color:#2A2A2A;color:#B7FF00;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;border-radius:4px;">
                      NEW QUOTE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 20px;font-size:18px;font-weight:bold;color:#FFFFFF;text-transform:uppercase;letter-spacing:0.5px;">
                Inquiry Details (#${H(b)})
              </h2>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;width:140px;">Brand / Company:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;font-weight:bold;">${H(a.company)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">Contact Name:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;">${H(a.name)}</td>
                </tr>
                ${j.join("")}
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">Product Category:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;text-transform:capitalize;">${H(a.productCategory)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;vertical-align:top;">Uploaded File:</td>
                  <td style="padding:12px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;">
                    ${h}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">Timestamp:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">${H(c)}</td>
                </tr>
              </table>

              <!-- Project Requirements Box -->
              <div style="margin-top:20px;padding:16px;background-color:#050505;border:1px solid #2A2A2A;border-radius:8px;">
                <div style="font-size:11px;font-weight:bold;color:#777777;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                  Project Requirements & Specifications:
                </div>
                <div style="font-size:14px;color:#E9E9E9;line-height:1.6;white-space:pre-wrap;">
${H(a.message)}
                </div>
              </div>

              <!-- Quick Reply / Contact Buyer CTA -->
              <div style="margin-top:28px;text-align:center;">
                ${a.email?`<a href="mailto:${H(a.email)}?subject=Re:%20SLOTS%20SPORTSWEAR%20Quote%20Inquiry%20(${H(a.company)})" 
                          style="display:inline-block;padding:12px 28px;background-color:#B7FF00;color:#050505;font-size:13px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;border-radius:999px;">
                         Reply Directly via Email
                       </a>`:a.phone?`<a href="https://wa.me/${H(a.phone.replace(/[^0-9]/g,""))}" 
                          style="display:inline-block;padding:12px 28px;background-color:#B7FF00;color:#050505;font-size:13px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;border-radius:999px;">
                         Contact Buyer on WhatsApp
                       </a>`:""}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background-color:#050505;border-top:1px solid #2A2A2A;text-align:center;font-size:11px;color:#777777;">
              This notification was generated automatically by the SLOTS SPORTSWEAR Website Inquiry System.<br>
              Direct contact email: <a href="mailto:${H(e)}" style="color:#777777;">${H(e)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `,l=`
NEW SLOTS SPORTSWEAR B2B QUOTE REQUEST
=========================================

Inquiry ID: #${b}
Company: ${a.company}
Contact Name: ${a.name}
Email: ${a.email||"Not provided"}
Phone / WhatsApp: ${a.phone||"Not provided"}
Product Category: ${a.productCategory}
Uploaded File: ${i}
Timestamp: ${c}

PROJECT REQUIREMENTS:
---------------------
${a.message}

=========================================
`;try{let b={from:f,to:[e],subject:g,html:k,text:l};a.email&&(b.reply_to=a.email);let c=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify(b)}),h=await c.json();if(!c.ok)return console.error("[Resend API Error]:",h),{success:!1,error:h.message||"Failed to send email notification."};return{success:!0,messageId:h.id}}catch(a){return console.error("[Email Transport Error]:",a),{success:!1,error:a instanceof Error?a.message:"Network error during email dispatch."}}}async function J(a){try{let b=await a.json(),c=(0,v.Gg)(b);if(!c.isValid||!c.data)return u.NextResponse.json({success:!1,error:"Please check the highlighted fields and try again.",errors:c.errors},{status:422});let d=await G(c.data),e=await I(c.data,d.id,d.createdAt);return e.success||console.warn(`[Inquiry #${d.id}] Email delivery warning: ${e.error}`),u.NextResponse.json({success:!0,inquiryId:d.id,message:"Thanks — your inquiry has been received. Our team will review your project details and follow up promptly.",createdAt:d.createdAt,emailDelivered:e.success},{status:201})}catch(a){return console.error("[API Inquiry Error]:",a),u.NextResponse.json({success:!1,error:"Something went wrong while submitting your inquiry. Please try again or contact us directly."},{status:500})}}let K=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/inquiry/route",pathname:"/api/inquiry",filename:"route",bundlePath:"app/api/inquiry/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"D:\\Slots sportswear\\src\\app\\api\\inquiry\\route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:L,workUnitAsyncStorage:M,serverHooks:N}=K;function O(){return(0,g.patchFetch)({workAsyncStorage:L,workUnitAsyncStorage:M})}async function P(a,b,c){var d;let e="/api/inquiry/route";"/index"===e&&(e="/");let g=await K.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:x,prerenderManifest:y,routerServerContext:z,isOnDemandRevalidate:A,revalidateOnlyGenerated:B,resolvedPathname:C}=g,D=(0,j.normalizeAppPath)(e),E=!!(y.dynamicRoutes[D]||y.routes[C]);if(E&&!x){let a=!!y.routes[C],b=y.dynamicRoutes[D];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let F=null;!E||K.isDev||x||(F="/index"===(F=C)?"/":F);let G=!0===K.isDev||!E,H=E&&!G,I=a.method||"GET",J=(0,i.getTracer)(),L=J.getActiveScopeSpan(),M={params:v,prerenderManifest:y,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:G,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:H,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>K.onRequestError(a,b,d,z)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>K.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=J.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${I} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${I} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&A&&B&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!E)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await K.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:H,isOnDemandRevalidate:A})},z),b}},l=await K.handleResponse({req:a,nextConfig:w,cacheKey:F,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:B,responseGenerator:k,waitUntil:c.waitUntil});if(!E)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",A?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),x&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&E||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await J.withPropagatedContext(a.headers,()=>J.trace(m.BaseServerSpan.handleRequest,{spanName:`${I} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":I,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await K.onRequestError(a,b,{routerKind:"App Router",routePath:D,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:H,isOnDemandRevalidate:A})}),E)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},96487:()=>{}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[331,692],()=>b(b.s=91648));module.exports=c})();