// Original-IP development bootstrap. Runs before app.js.
(function(){
  const params=new URLSearchParams(location.search);
  const original=params.get('content')==='original'||params.get('original')==='1';
  window.CARDBOUND_ORIGINAL_MODE=original;
  if(!original){
    // Recover prototype save if a prior original-mode tab exited unexpectedly.
    if(localStorage.cardboundOriginalActive==='1'&&localStorage.cardboundPrototypeBackup!=null){
      localStorage.cardbound=localStorage.cardboundPrototypeBackup;
      localStorage.removeItem('cardboundOriginalActive');
    }
    return;
  }
  if(localStorage.cardboundOriginalActive!=='1'){
    localStorage.cardboundPrototypeBackup=localStorage.cardbound||'';
  }
  localStorage.cardboundOriginalActive='1';
  localStorage.cardbound=localStorage.cardboundOriginal||'';
  const preserve=()=>{
    try{
      localStorage.cardboundOriginal=localStorage.cardbound||'';
      localStorage.cardbound=localStorage.cardboundPrototypeBackup||'';
      localStorage.removeItem('cardboundOriginalActive');
    }catch{}
  };
  addEventListener('pagehide',preserve);
  addEventListener('beforeunload',preserve);
})();