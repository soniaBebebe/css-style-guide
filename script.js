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
const headingFont=document.getElementById('headingFont');
const bodyFont=document.getElementById('bodyFont');
const fontScale=document.getElementById('fontScale');
const imageInput=document.getElementById('imageInput')

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
    const gray=generateGrayPalette(h,s,l);
    renderGrayPalette(gray);

    document.documentElement.style.setProperty("--accent", hex);
    console.log({brand,hex});
    
    renderSemanticColors(getSemanticColors());
    renderTypography({
        headingFont: headingFont.value,
        bodyFont: bodyFont.value
    }, Number(fontScale.value));
}

brandName.addEventListener('input', updateUI);
primaryColor.addEventListener('input', updateUI);
hue.addEventListener('input', updateUI);
sat.addEventListener('input', updateUI);
lig.addEventListener('input', updateUI);
successColor.addEventListener("input", updateUI);
warningColor.addEventListener("input", updateUI);
dangerColor.addEventListener("input", updateUI);
headingFont.addEventListener("input", updateUI);
bodyFont.addEventListener("input", updateUI);
fontScale.addEventListener("input", updateUI);
imageInput.addEventListener("change", handleImageUpload);

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
        <span>${hex}</span>
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
        success:successColor.value,
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

function generateTypeScale(scale=1){
    return{
        h1:32*scale,
        h2:24*scale,
        h3:20*scale,
        bodyLg:18*scale,
        body:16*scale,
        small:14*scale
    };
}

function renderTypography(fonts,scale){
    const preview=document.getElementById("typoPreview");
    preview.innerHTML="";
    const sizes=generateTypeScale(scale);

    const html=`
    <div style="font-family:${fonts.headingFont}; font-size:${sizes.h1}px; font-weight:700;">Heading H1 - ${sizes.h1}px</div>
    <div style="font-family:${fonts.headingFont}; font-size:${sizes.h2}px; font-weight:600; margin-top:8px">Heading H2 - ${sizes.h2}px</div>
    <div style="font-family:${fonts.headingFont}; font-size:${sizes.h3}px; font-weight:600; margin-top:8px">Heading H3 - ${sizes.h3}px</div>
    <p style="font-family:${fonts.bodyFont}; font-size:${sizes.bodyLg}px; margin-top:14px;">
    Body Large - ${sizes.bodyLg}px. This is example text.
    </p>
    <p style="font-family:${fonts.bodyFont}; font-size:${sizes.body}px;">
    Body - ${sizes.body}px. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <p style="font-family:${fonts.bodyFont}; font-size:${sizes.small}px; opacity:0.7;">
    Small Text - ${sizes.small}px.
    </p>
    `
    preview.innerHTML=html;
}
function handleImageUpload(event){
    const file=event.target.files[0];
    if (!file) return;

    const img=new Image();
    img.onload =()=> extractColorsFromImage(img);
    img.src=URL.createObjectURL(file); 
}

function extractColorsFromImage(img){
    const canvas=document.getElementById('colorCanvas');
    const ctx =canvas.getContext("2d");

    canvas.width=200;
    canvas.height=200;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const {data}=ctx.getImageData(0,0,canvas.width,canvas.height);

    const pixels=[];
    for (let i=0; i<data.length; i+=4){
        pixels.push([data[i], data[i+1], data[i+2]]);
    }
    const colors=kmeansColors(pixels,6);
    renderImagePalette(colors);
}
function kmeansColors(pixels, k=6, iterations=6){
    let centroids = pixels.sort(()=> Math.random()-0.5).slice(0,k);
    for (let iter=0; iter<iterations; iter++){
        const groups = Array.from({length:k}, ()=>[]);
        pixels.forEach(p=>{
            let minDist=Infinity;
            let idx=0;
            centroids.forEach((c,i)=>{
                const d=(p[0]-c[0])**2 + (p[1]-c[1])**2 + (p[2]-c[2])**2;
                if (d<minDist){
                    minDist=d;
                    idx=i;
                }
            });
            groups[idx].push(p);
        })
        centroids=groups.map(g=>{
            if (g.length===0) return[0,0,0];
            const r=g.reduce((s,p)=>s+p[0],0)/g.length;
            const g_=g.reduce((s,p)=>s+p[1],0)/g.length;
            const b=g.reduce((s,p)=>s+p[2],0)/g.length;
            return [Math.round(r), Math.round(g_), Math.round(b)];
        });
    }
    return centroids.map(c=> rgbToHex(c[0], c[1],c[2]));
}

function renderGrayPalette(palette){
    const container=document.getElementById("grayPreview");
    container.innerHTML="";
    Object.entries(palette).forEach(([tone,hex])=>{
        const div=document.createElement("div");
        div.style.background=hex;
        div.style.borderRadius="8px";
        div.style.padding="10px";
        div.style.color="#fff";
        div.style.fontSize="12px";
        div.innerHTML=`<strong>${tone}</strong><span>${hex}</span>`;
        container.appendChild(div);
    })
}

function renderImagePalette(colors){
    const container=document.getElementById("imagePalette");
    container.innerHTML="";

    colors.forEach(hex=>{
        const div=document.createElement("div");
        div.style.background=hex;
        div.style.width="90px";
        div.style.height="90px";

        div.style.borderRadius="12px";
        div.style.display="flex";
        div.style.alignItems="flex-end";
        div.style.justifyContent="center";
        div.style.color="#fff";

        div.style.fontSize="12px";
        div.style.padding="6px";
        div.style.boxShadow="0 0 5px rgba(0,0,0,.2)";
        div.textContent=hex;
        container.appendChild(div);
    });
}