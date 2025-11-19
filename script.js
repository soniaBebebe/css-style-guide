const brandName=document.getElementById('brandName');
const primaryColor=document.getElementById('primaryColor');
const hue=document.getElementById('hue');
const sat=document.getElementById('sat');
const lig=document.getElementById('lig');
const brandTitle=document.querySelector('#brandTitle');
const btnPrimary=document.querySelector('.btn.primary');

function updateUI(){
    const brand=brandName.value;
    const h=Number(hue.value);
    const s=Number(sat.value);
    const l=Number(lig.value);

    const computerHex=hslToHex(h,s,l);

    brandTitle.textContent=brand;
    btnPrimary.style.background=computerHex;
    btnPrimary.style.borderColor=computerHex;

    document.documentElement.style.setProperty('--accent', computerHex);

    const debug={
        brand, 
        h,s,l,
        computerHex
    };
    console.log(debug);
}

brandName.addEventListener('input', updateUI);
primaryColor.addEventListener('input', updateUI);
hue.addEventListener('input', updateUI);
sat.addEventListener('input', updateUI);
lig.addEventListener('input', updateUI);

updateUI();

function hslToRgb(h,s,l){
    s/=100;
    l/=100;
    const k=n=>(n+h/30)%12;
    const a=s*Math.min(l,1-l);
    const f=n=>l-a*Math.max(-1,Math.min(k(n)-3, Math.min(9-k(n),1)));
    return [Math.round(255*f(0)), Math.round(255*f(8)), Math.round(255*f(4))];
}

function rgbToHex(r,g,b){
    return "#"+[r,g,b]
    .map(x=>x.toString(16).padStart(2,"0"))
    .join("")
    .toUpperCase();
}

function hslToHex(h,s,l){
    const [r,g,b]=hslToRgb(h,s,l);
    return rgbToHex(r,g,b);
}