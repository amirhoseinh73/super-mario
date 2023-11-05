var A=Object.defineProperty;var q=(o,t,e)=>t in o?A(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var r=(o,t,e)=>(q(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const x=16;var E=(o=>(o[o.x=64]="x",o[o.y=64]="y",o))(E||{}),T=(o=>(o[o.w=14]="w",o[o.h=16]="h",o))(T||{}),w=(o=>(o[o.w=16]="w",o[o.h=16]="h",o))(w||{});const j=1500,H=1,W=0;var m=(o=>(o.SPACE="Space",o.ARROW_RIGHT="ArrowRight",o.ARROW_LEFT="ArrowLeft",o.SPEED_X="KeyX",o))(m||{});const L=256,M=256;var k=(o=>(o[o.width=64]="width",o[o.height=64]="height",o))(k||{});const F=.001,O=2e-4,l={TOP:Symbol("top"),BOTTOM:Symbol("bottom"),RIGHT:Symbol("right"),LEFT:Symbol("left")};class D{constructor(){r(this,"keyStates");r(this,"keyMap");this.keyStates=new Map,this.keyMap=new Map}addMapping(t,e){this.keyMap.set(t,e)}handleEvent(t){const{code:e}=t;if(!this.keyMap.has(e))return;t.preventDefault();const s=t.type==="keydown"?H:W;this.keyStates.get(e)!==s&&(this.keyStates.set(e,s),this.keyMap.get(e)(s))}listenTo(t){["keydown","keyup"].forEach(s=>{t.addEventListener(s,i=>{this.handleEvent(i)})})}}const X=function(o,t){return function(s){const i=Math.floor(s/t)%o.length;return o[i]}},J=function(o){const t=new D;return t.addMapping(m.SPACE,e=>{e?o.jump.start():o.jump.cancel()}),t.addMapping(m.SPEED_X,e=>{o.turbo&&o.turbo(e)}),t.addMapping(m.ARROW_RIGHT,e=>{o.go.dir+=e?1:-1}),t.addMapping(m.ARROW_LEFT,e=>{o.go.dir+=e?-1:1}),t};class K{constructor(t=1/60){r(this,"update");r(this,"updateProxy");let e=0,s=0;this.updateProxy=i=>{for(e+=(i-s)/1e3,e>1&&(e=1);e>t;)this.update(t),e-=t;s=i,this.enqueue()}}enqueue(){requestAnimationFrame(this.updateProxy)}start(){this.enqueue()}}class G{constructor(){r(this,"grid");this.grid=[]}forEach(t){this.grid.forEach((e,s)=>{e.forEach((i,n)=>{t(i,s,n)})})}get(t,e){const s=this.grid[t];if(s)return s[e]}set(t,e,s){this.grid[t]||(this.grid[t]=[]),this.grid[t][e]=s}}class g{constructor(t,e){r(this,"x");r(this,"y");this.set(t,e)}set(t,e){this.x=t,this.y=e}}class U{constructor(){r(this,"pos");r(this,"size");this.pos=new g(0,0),this.size=new g(L,M)}}class V{constructor(){r(this,"layers");this.layers=[]}draw(t,e){this.layers.forEach(s=>{s(t,e)})}}class B{constructor(t,e=x){r(this,"matrix");r(this,"tileSize");this.matrix=t,this.tileSize=e}toIndex(t){return Math.floor(t/this.tileSize)}toIndexRange(t,e){const s=Math.ceil(e/this.tileSize)*this.tileSize,i=[];let n=t;do i.push(this.toIndex(n)),n+=this.tileSize;while(n<s);return i}getByIndex(t,e){const s=this.matrix.get(t,e);if(s){const i=t*this.tileSize,n=i+this.tileSize,a=e*this.tileSize,c=a+this.tileSize;return{tile:s,x1:i,x2:n,y1:a,y2:c}}}searchByPosition(t,e){return this.getByIndex(this.toIndex(t),this.toIndex(e))}searchByRange(t,e,s,i){const n=[];return this.toIndexRange(t,e).forEach(a=>{this.toIndexRange(s,i).forEach(c=>{const h=this.getByIndex(a,c);h&&n.push(h)})}),n}}class ${constructor(t){r(this,"tiles");this.tiles=new B(t)}checkX(t){let e;if(t.vel.x>0)e=t.bounds.right;else if(t.vel.x<0)e=t.bounds.left;else return;this.tiles.searchByRange(e,e,t.bounds.top,t.bounds.bottom).forEach(i=>{i.tile.type==="ground"&&(t.vel.x>0?t.bounds.right>i.x1&&(t.bounds.right=i.x1,t.vel.x=0,t.obstruct(l.RIGHT)):t.vel.x<0&&t.bounds.left<i.x2&&(t.bounds.left=i.x2,t.vel.x=0,t.obstruct(l.RIGHT)))})}checkY(t){let e;if(t.vel.y>0)e=t.bounds.bottom;else if(t.vel.y<0)e=t.bounds.top;else return;this.tiles.searchByRange(t.bounds.left,t.bounds.right,e,e).forEach(i=>{i.tile.type==="ground"&&(t.vel.y>0?t.bounds.bottom>i.y1&&(t.bounds.bottom=i.y1,t.vel.y=0,t.obstruct(l.BOTTOM)):t.vel.y<0&&t.bounds.top<i.y2&&(t.bounds.top=i.y2,t.vel.y=0,t.obstruct(l.TOP)))})}}class Q{constructor(){r(this,"gravity");r(this,"comp");r(this,"entities");r(this,"tiles");r(this,"tileCollider");r(this,"totalTime");this.gravity=j,this.totalTime=0,this.comp=new V,this.entities=new Set,this.tileCollider=null}setCollisionGrid(t){this.tileCollider=new $(t)}update(t){this.entities.forEach(e=>{this.tileCollider&&(e.update(t),e.pos.x+=e.vel.x*t,this.tileCollider.checkX(e),e.pos.y+=e.vel.y*t,this.tileCollider.checkY(e),e.vel.y+=this.gravity*t)}),this.totalTime+=t}}const N=function(o,t,e){const s=new B(t),i=document.createElement("canvas");i.width=L,i.height=M;const n=i.getContext("2d");function a(c,h){n.clearRect(0,0,i.width,i.height);for(let d=c;d<=h;++d){const u=t.grid[d];u&&u.forEach((f,p)=>{const b=f;e.animations.has(b.name)?e.drawAnim(b.name,n,d-c,p,o.totalTime):e.drawTile(b.name,n,d-c,p)})}}return function(h,d){const u=s.toIndex(d.size.x),f=s.toIndex(d.pos.x),p=f+u;a(f,p),h.drawImage(i,-d.pos.x%x,-d.pos.y)}},Z=function(o,t=k.width,e=k.width){const s=document.createElement("canvas");s.width=t,s.height=e;const i=s.getContext("2d");return function(a,c){o.forEach(h=>{i.clearRect(0,0,t,e),h.draw(i),a.drawImage(s,h.pos.x-c.pos.x,h.pos.y-c.pos.y)})}};class Y{constructor(t,e,s){r(this,"image");r(this,"width");r(this,"height");r(this,"tiles");r(this,"animations");this.image=t,this.width=e,this.height=s,this.tiles=new Map,this.animations=new Map}defineAnim(t,e){this.animations.set(t,e)}define(t,e,s,i,n){const a=[!1,!0].map(c=>{const h=document.createElement("canvas");h.width=i,h.height=n;const d=h.getContext("2d");return c&&(d.scale(-1,1),d.translate(-i,0)),d.drawImage(this.image,e,s,i,n,0,0,i,n),h});this.tiles.set(t,a)}defineTile(t,e,s){this.define(t,e*this.width,s*this.height,this.width,this.height)}draw(t,e,s,i,n=!1){const a=this.tiles.get(t);a&&e.drawImage(a[Number(n)],s,i)}drawAnim(t,e,s,i,n){const a=this.animations.get(t);this.drawTile(a(n),e,s,i)}drawTile(t,e,s,i){this.draw(t,e,s*this.width,i*this.height)}}class I{constructor(t,e,s){r(this,"pos");r(this,"size");r(this,"offset");this.pos=t,this.size=e,this.offset=s}get bottom(){return this.pos.y+this.size.y+this.offset.y}set bottom(t){this.pos.y=t-(this.size.y+this.offset.y)}get top(){return this.pos.y+this.offset.y}set top(t){this.pos.y=t-this.offset.y}get left(){return this.pos.x+this.offset.x}set left(t){this.pos.x=t-this.offset.x}get right(){return this.pos.x+this.size.x+this.offset.x}set right(t){this.pos.x=t-(this.size.x+this.offset.x)}}class S{constructor(t){r(this,"NAME");this.NAME=t}obstruct(t,e){}update(t,e){console.warn("Unhandled update call in Trait")}}class z{constructor(){r(this,"pos");r(this,"vel");r(this,"size");r(this,"offset");r(this,"bounds");r(this,"traits");r(this,"lifetime");r(this,"draw");r(this,"turbo");this.pos=new g(0,0),this.vel=new g(0,0),this.size=new g(0,0),this.offset=new g(0,0),this.bounds=new I(this.pos,this.size,this.offset),this.lifetime=0,this.traits=[]}addTrait(t){this.traits.push(t),this[t.NAME]=t}obstruct(t){this.traits.forEach(e=>{e.obstruct(this,t)})}update(t){this.traits.forEach(e=>{e.update(this,t)}),this.lifetime+=t}}class P extends S{constructor(){super("pendulumWalk");r(this,"speed");this.speed=-30}obstruct(e,s){(s===l.LEFT||s===l.RIGHT)&&(this.speed=-this.speed)}update(e,s){e.vel.x=this.speed}}const _=async function(){return y("goomba").then(tt)},tt=function(o){const t=o.animations.get("walk"),e=function(s){o.draw(t(this.lifetime),s,0,0)};return function(){const i=new z;return i.size.set(w.w,w.h),i.addTrait(new P),i.draw=e,i}},et=async function(){return y("koopa").then(st)},st=function(o){const t=o.animations.get("walk"),e=function(s){o.draw(t(this.lifetime),s,0,0,this.vel.x<0)};return function(){const i=new z;return i.size.set(w.w,w.h),i.offset.y=8,i.addTrait(new P),i.draw=e,i}};class ot extends S{constructor(){super("go");r(this,"dir");r(this,"acceleration");r(this,"deceleration");r(this,"dragFactor");r(this,"distance");r(this,"heading");this.dir=0,this.acceleration=400,this.deceleration=300,this.dragFactor=F,this.distance=0,this.heading=1}update(e,s){const i=Math.abs(e.vel.x);if(this.dir!==0)e.vel.x+=this.acceleration*s*this.dir,e.jump?e.jump.falling===!1&&(this.heading=this.dir):this.heading=this.dir;else if(e.vel.x!==0){const a=Math.min(i,this.deceleration*s);e.vel.x+=e.vel.x>0?-a:a}else this.distance=0;const n=this.dragFactor*e.vel.x*i;e.vel.x-=n,this.distance+=i*s}}class it extends S{constructor(){super("jump");r(this,"duration");r(this,"velocity");r(this,"engageTime");r(this,"ready");r(this,"requestTime");r(this,"gracePeriod");r(this,"speedBoost");this.ready=0,this.duration=.3,this.engageTime=0,this.requestTime=0,this.gracePeriod=.1,this.speedBoost=.3,this.velocity=200}get falling(){return this.ready<0}start(){this.requestTime=this.gracePeriod}cancel(){this.engageTime=0,this.requestTime=0}obstruct(e,s){s===l.BOTTOM?this.ready=1:s===l.TOP&&this.cancel()}update(e,s){this.requestTime>0&&(this.ready>0&&(this.engageTime=this.duration,this.requestTime=0),this.requestTime-=s),this.engageTime>0&&(e.vel.y=-(this.velocity+Math.abs(e.vel.x)*this.speedBoost),this.engageTime-=s),this.ready--}}const nt=async function(){return y("mario").then(rt)},rt=function(o){const t=o.animations.get("run");function e(n){return n.jump.falling?"jump":n.go.distance>0?n.vel.x>0&&n.go.dir<0||n.vel.x<0&&n.go.dir>0?"break":t(n.go.distance):"idle"}function s(n){this.go.dragFactor=n?O:F}function i(n){o.draw(e(this),n,0,0,this.go.heading<0)}return function(){const a=new z;return a.size.set(T.w,T.h),a.addTrait(new ot),a.addTrait(new it),a.turbo=s,a.draw=i,a.turbo(!1),a}},at=function(o){return new Promise(t=>{const e=new Image;e.addEventListener("load",()=>{t(e)}),e.src=o})},R=async function(o){return fetch(o).then(t=>t.json())},y=async function(o){var i,n,a;const t=await R(`/@sprites/${o}.json`),e=await at(t.imageURL),s=new Y(e,t.tileW||x,t.tileH||x);return(i=t.tiles)==null||i.forEach(c=>{s.defineTile(c.name,c.index[0],c.index[1])}),(n=t.frames)==null||n.forEach(c=>{s.define(c.name,...c.rect)}),(a=t.animations)==null||a.forEach(c=>{const h=X(c.frames,c.frameLen);s.defineAnim(c.name,h)}),s},ct=function(){const o={mario:function(){throw new Error("Function not implemented.")},goomba:function(){throw new Error("Function not implemented.")},koopa:function(){throw new Error("Function not implemented.")}},t=function(e){return s=>o[e]=s};return Promise.all([nt().then(t("mario")),_().then(t("goomba")),et().then(t("koopa"))]).then(()=>o)},v=function*(o,t,e,s){const i=o+t,n=e+s;for(let a=o;a<i;++a)for(let c=e;c<n;++c)yield{x:a,y:c}},ht=function(o){if(o.length===4){const[t,e,s,i]=o;return v(t,e,s,i)}else if(o.length===3){const[t,e,s]=o;return v(t,e,s,1)}else{const[t,e]=o;return v(t,1,e,1)}},dt=function*(o){for(const t of o)for(const e of ht(t))yield e},C=function(o,t){const e=[];function s(i,n,a){for(const c of i)for(const{x:h,y:d}of dt(c.ranges)){const u=h+n,f=d+a;if(c.pattern){const p=t[c.pattern];s(p.tiles,u,f);continue}e.push({tile:c,x:u,y:f})}}return s(o,0,0),e},lt=function(o,t){const e=new G;for(const{tile:s,x:i,y:n}of C(o,t))e.set(i,n,{type:s.type});return e},ut=function(o,t){const e=new G;for(const{tile:s,x:i,y:n}of C(o,t))e.set(i,n,{name:s.name});return e},ft=async function(o){const t=await R(`/@levels/${o}.json`),e=await y(t.spritesheet),s=new Q,i=t.layers.reduce((c,h)=>c.concat(h.tiles),[]),n=lt(i,t.patterns);s.setCollisionGrid(n),t.layers.forEach(c=>{const h=ut(c.tiles,t.patterns),d=N(s,h,e);s.comp.layers.push(d)});const a=Z(s.entities);return s.comp.layers.push(a),s},pt=document.getElementById("screen"),gt=pt.getContext("2d");Promise.all([ct(),ft("1-1")]).then(([o,t])=>{const e=new U,s=o.mario();s.pos.set(E.x,E.y),t.entities.add(s);const i=o.goomba();i.pos.set(220,16),t.entities.add(i);const n=o.koopa();n.pos.x=150,t.entities.add(n),J(s).listenTo(window);const c=new K;c.update=function(d){t.update(d),s.pos.x>100&&(e.pos.x=s.pos.x-100),t.comp.draw(gt,e)},c.start()});
