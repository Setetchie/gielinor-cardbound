// Historical compatibility shim.
// Sailing navigation and rendering now live in core-ui-fix.js.
(function(){
if(typeof window.cbOpenSailing!=='function'&&typeof window.cbSetSkill==='function')window.cbOpenSailing=()=>cbSetSkill('Sailing');
if(typeof window.cb33SailingCategory!=='function'&&typeof window.cbSailingCategory==='function')window.cb33SailingCategory=window.cbSailingCategory;
if(typeof window.cb33SailingBack!=='function'&&typeof window.cbSailingBack==='function')window.cb33SailingBack=window.cbSailingBack;
})();
