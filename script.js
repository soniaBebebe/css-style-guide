const brandName=document.getElementById('brandName');
const primaryColor=document.getElementById('primaryColor');
const hue=document.getElementById('hue');
const sat=document.getElementById('sat');
const lig=document.getElementById('lig');
const brandTitle=document.querySelector('#brandTitle');
const btnPrimary=document.querySelector('.btn.primary');
const successColor=document.getElementById('successColor');
const warningColor=document.getElementById('warningColor');
const dangerColor=document.getElementById('dangerColor');

function updateUI(){
    const brand=brandName.value;
    let hex;
    const h=Number(hue.value);
    const s=Number(sat.value);
    const l=Number(lig.value);
    // const h=Number(hue.value);
    // const s=Number(sat.value);
    // const l=Number(lig.value);

    // const computerHex=hslToHex(h,s,l);

    // brandTitle.textContent=brand;
    // btnPrimary.style.background=computerHex;
    // btnPrimary.style.borderColor=computerHex;

    // document.documentElement.style.setProperty('--accent', computerHex);

    // const debug={
    //     brand, 
    //     h,s,l,
    //     computerHex
    // };
    // console.log(debug);
    if (primaryColor===document.activeElement){
        hex=primaryColor.value;
    } else{
        
        hex=hslToHex(h,s,l);

        primaryColor.value=hex;
    }
    brandTitle.textContent=brand;
    btnPrimary.style.background=hex;
    btnPrimary.style.borderColor=hex;
    const palette=generatePalette(h,s,l);
    renderPalette(palette);

    document.documentElement.style.setProperty("--accent", hex);
    console.log({brand,hex});
    
    renderSemanticColors(getSemanticColors());
}

brandName.addEventListener('input', updateUI);
primaryColor.addEventListener('input', updateUI);
hue.addEventListener('input', updateUI);
sat.addEventListener('input', updateUI);
lig.addEventListener('input', updateUI);
successColor.addEventListener("input", updateUI);
warningColor.addEventListener("input", updateUI);
dangerColor.addEventListener("input", updateUI);

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

function generatePalette(baseH, baseS, baseL){
    const tones=[100,200,300,400,500,600,700,800,900];
    const palette={};

    tones.forEach((tone,index)=>{
        const shift=index-4;
        const l=Math.min(95,Math.max(8,baseL-shift*8));
        const s=Math.min(95, Math.max(20,baseS+shift*4));
        const hex=hslToHex(baseH, s, l);
        
        palette[tone]=hex;
    })
    return palette;
}

function renderPalette(palette){
    const container=document.getElementById("palettePreview");
    container.innerHTML="";

    Object.entries(palette).forEach(([tone,hex])=>{
        const div=document.createElement("div")
        div.style.background=hex;
        div.style.borderRadius="8px";
        div.style.padding="10px";
        div.style.color="#fff";
        div.style.fontSize="12px";
        div.style.boxShadow="0 0 5px rgba(0,0,0,.2)";
        div.style.display="flex";
        div.style.flexDirection="column";
        div.style.gap="4px";

        div.innerHTML=`
        <strong>${tone}</strong>
        <spn>${hex}</span>
        `;
        container.appendChild(div);
    })
}

function generateGrayPalette(baseH, baseS, baseL){
    const tones=[100,200,300,400,500,600,700,800,900];
    const palette={};

    tones.forEach((tone,index)=>{
        const shift=index-4;
        const l=Math.min(95,Math.max(8,baseL-shift*8));
        const s=10;
        const hex=hslToHex(210,s,l);
        palette[tone]=hex;
    })
    return palette;
}

function getSemanticColors(){
    return{
        sucess:successColor.value,
        warning:warningColor.value,
        danger:dangerColor.value
    };
}

function renderSemanticColors(colors){
    const container=document.getElementById("semanticPreview");
    container.innerHTML="";
    Object.entries(colors).forEach(([name,hex])=>{
        const div=document.createElement("div");
        div.style.background=hex;
        div.style.padding="12px 18px";
        div.style.borderRadius="8px";
        div.style.boxShadow="0 0 5px rgba(0,0,0,.2)";
        div.style.color="#fff";
        div.style.fontWeight="600";
        div.style.minWidth="120px";
        div.textContent=`${name}: ${hex}`;
        container.appendChild(div);
    })
}