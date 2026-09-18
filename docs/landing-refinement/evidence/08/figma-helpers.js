await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1648:18212'));
const createdNodeIds=[], mutatedNodeIds=[];
const addIds=n=>{createdNodeIds.push(n.id); if('findAll' in n)createdNodeIds.push(...n.findAll(()=>true).map(c=>c.id));};
async function fonts(n){const tt=n.type==='TEXT'?[n]:n.findAllWithCriteria({types:['TEXT']}); const ff=[...new Map(tt.flatMap(t=>t.getStyledTextSegments(['fontName']).map(s=>[JSON.stringify(s.fontName),s.fontName]))).values()]; await Promise.all(ff.map(f=>figma.loadFontAsync(f)));}
const vv=await Promise.all(['70:4','70:8','70:9','70:13','69:32','69:33','69:34','69:36','69:44'].map(id=>figma.variables.getVariableByIdAsync('VariableID:'+id)));
const [surface,primary,secondary,accent,gap8,gap12,gap16,gap24,radius12]=vv;
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
await Promise.all(['Regular','Medium','Semi Bold','Bold'].map(style=>figma.loadFontAsync({family:'Inter',style})));
async function tx(parent,name,value,styleId,color=primary){const t=figma.createText();t.fontName={family:'Inter',style:'Regular'};parent.appendChild(t);t.name=name;t.characters=value;t.textStyleId=styleId;t.resize(parent.width-parent.paddingLeft-parent.paddingRight,24);t.textAutoResize='HEIGHT';t.layoutSizingHorizontal='FILL';t.layoutSizingVertical='HUG';t.fills=[paint(color)];addIds(t);return t;}
async function inst(parent,id,name,props){const c=await figma.getNodeByIdAsync(id);await fonts(c);const n=c.createInstance();parent.appendChild(n);n.name=name;n.setProperties(props);n.resize(parent.width-parent.paddingLeft-parent.paddingRight,n.height);n.layoutSizingHorizontal='FILL';addIds(n);return n;}
const styles={title:'S:d2fc7d95668807196e506cd5098b794f4f8f2919,',body:'S:0be3cc948ceaf4ba986b7138603cc5658b522735,',small:'S:2311d885f6684e63667ee05a255dcf3113f0f86c,',label:'S:034049dd643c7dd11fe242b7978c52a28a7ae535,',caption:'S:2d65dcfe372a07ae6f2be7a1f91d3ef5721d7afb,'};
