/* Example banner from "Typed & Bundled Surge" project */
"use strict";(()=>{var t=$response.body;if(typeof t=="string"){let s=JSON.parse(t);s.data?.stocks?.length&&(s.data.stocks=s.data.stocks.map(e=>({...e,sent:0})),$done({body:JSON.stringify(s)}))}})();
