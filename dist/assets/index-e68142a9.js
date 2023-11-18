var J=Object.defineProperty;var V=(i,e,t)=>e in i?J(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var a=(i,e,t)=>(V(i,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const k=16;var L=(i=>(i[i.x=64]="x",i[i.y=64]="y",i))(L||{}),z=(i=>(i[i.w=14]="w",i[i.h=16]="h",i))(z||{}),b=(i=>(i[i.w=16]="w",i[i.h=16]="h",i))(b||{});const N=1500,U=1,Q=0;var y=(i=>(i.SPACE="Space",i.ARROW_RIGHT="ArrowRight",i.ARROW_LEFT="ArrowLeft",i.SPEED_X="KeyX",i))(y||{});const F=256,G=256;var C=(i=>(i[i.width=64]="width",i[i.height=64]="height",i))(C||{});const R=.001,_=2e-4,u={TOP:Symbol("top"),BOTTOM:Symbol("bottom"),RIGHT:Symbol("right"),LEFT:Symbol("left")};class I{constructor(){a(this,"keyStates");a(this,"keyMap");this.keyStates=new Map,this.keyMap=new Map}addMapping(e,t){this.keyMap.set(e,t)}handleEvent(e){const{code:t}=e;if(!this.keyMap.has(t))return;e.preventDefault();const s=e.type==="keydown"?U:Q;this.keyStates.get(t)!==s&&(this.keyStates.set(t,s),this.keyMap.get(t)(s))}listenTo(e){["keydown","keyup"].forEach(s=>{e.addEventListener(s,n=>{this.handleEvent(n)})})}}const q=function(i,e){e?i.jump.start():i.jump.cancel()},D=function(i,e){i.turbo&&i.turbo(e)},j=function(i,e){i.go.dir+=e?1:-1},H=function(i,e){i.go.dir+=e?-1:1},Z=function(i,e){return function(s){const n=Math.floor(s/e)%i.length;return i[n]}},Y=function(i){const e=new I;return e.addMapping(y.SPACE,t=>{q(i,t)}),e.addMapping(y.SPEED_X,t=>{D(i,t)}),e.addMapping(y.ARROW_RIGHT,t=>{j(i,t)}),e.addMapping(y.ARROW_LEFT,t=>{H(i,t)}),e};class ee{constructor(e=1/60){a(this,"update");a(this,"updateProxy");let t=0,s=0;this.updateProxy=n=>{for(t+=(n-s)/1e3,t>1&&(t=1);t>e;)this.update(e),t-=e;s=n,this.enqueue()}}enqueue(){requestAnimationFrame(this.updateProxy)}start(){this.enqueue()}}class O{constructor(){a(this,"grid");this.grid=[]}forEach(e){this.grid.forEach((t,s)=>{t.forEach((n,o)=>{e(n,s,o)})})}get(e,t){const s=this.grid[e];if(s)return s[t]}set(e,t,s){this.grid[e]||(this.grid[e]=[]),this.grid[e][t]=s}}class m{constructor(e,t){a(this,"x");a(this,"y");this.set(e,t)}set(e,t){this.x=e,this.y=t}}class te{constructor(){a(this,"pos");a(this,"size");this.pos=new m(0,0),this.size=new m(F,G)}}class se{constructor(){a(this,"layers");this.layers=[]}draw(e,t){this.layers.forEach(s=>{s(e,t)})}}class ie{constructor(e){a(this,"entities");this.entities=e}check(e){this.entities.forEach(t=>{e!==t&&e.bounds.overlaps(t.bounds)&&(e.collides(t),t.collides(e))})}}class W{constructor(e,t=k){a(this,"matrix");a(this,"tileSize");this.matrix=e,this.tileSize=t}toIndex(e){return Math.floor(e/this.tileSize)}toIndexRange(e,t){const s=Math.ceil(t/this.tileSize)*this.tileSize,n=[];let o=e;do n.push(this.toIndex(o)),o+=this.tileSize;while(o<s);return n}getByIndex(e,t){const s=this.matrix.get(e,t);if(s){const n=e*this.tileSize,o=n+this.tileSize,r=t*this.tileSize,c=r+this.tileSize;return{tile:s,x1:n,x2:o,y1:r,y2:c}}}searchByPosition(e,t){return this.getByIndex(this.toIndex(e),this.toIndex(t))}searchByRange(e,t,s,n){const o=[];return this.toIndexRange(e,t).forEach(r=>{this.toIndexRange(s,n).forEach(c=>{const l=this.getByIndex(r,c);l&&o.push(l)})}),o}}class ne{constructor(e){a(this,"tiles");this.tiles=new W(e)}checkX(e){let t;if(e.vel.x>0)t=e.bounds.right;else if(e.vel.x<0)t=e.bounds.left;else return;this.tiles.searchByRange(t,t,e.bounds.top,e.bounds.bottom).forEach(n=>{n.tile.type==="ground"&&(e.vel.x>0?e.bounds.right>n.x1&&e.obstruct(u.RIGHT,n):e.vel.x<0&&e.bounds.left<n.x2&&e.obstruct(u.LEFT,n))})}checkY(e){let t;if(e.vel.y>0)t=e.bounds.bottom;else if(e.vel.y<0)t=e.bounds.top;else return;this.tiles.searchByRange(e.bounds.left,e.bounds.right,t,t).forEach(n=>{n.tile.type==="ground"&&(e.vel.y>0?e.bounds.bottom>n.y1&&e.obstruct(u.BOTTOM,n):e.vel.y<0&&e.bounds.top<n.y2&&e.obstruct(u.TOP,n))})}}class oe{constructor(){a(this,"gravity");a(this,"comp");a(this,"entities");a(this,"tiles");a(this,"tileCollider");a(this,"entityCollider");a(this,"totalTime");this.gravity=N,this.totalTime=0,this.comp=new se,this.entities=new Set,this.entityCollider=new ie(this.entities),this.tileCollider=null}setCollisionGrid(e){this.tileCollider=new ne(e)}update(e){this.entities.forEach(t=>{this.tileCollider&&t.update(e,this)}),this.entities.forEach(t=>{this.entityCollider.check(t)}),this.entities.forEach(t=>{t.finalize()}),this.totalTime+=e}}const re=function(i,e,t){const s=new W(e),n=document.createElement("canvas");n.width=F+16,n.height=G;const o=n.getContext("2d");function r(c,l){o.clearRect(0,0,n.width,n.height);for(let d=c;d<=l;++d){const h=e.grid[d];h&&h.forEach((p,g)=>{const S=p;t.animations.has(S.name)?t.drawAnim(S.name,o,d-c,g,i.totalTime):t.drawTile(S.name,o,d-c,g)})}}return function(l,d){const h=s.toIndex(d.size.x),p=s.toIndex(d.pos.x),g=p+h;r(p,g),l.drawImage(n,-d.pos.x%k,-d.pos.y)}},ae=function(i,e=C.width,t=C.width){const s=document.createElement("canvas");s.width=e,s.height=t;const n=s.getContext("2d");return function(r,c){i.forEach(l=>{n.clearRect(0,0,e,t),l.draw(n),r.drawImage(s,l.pos.x-c.pos.x,l.pos.y-c.pos.y)})}};function ce(i){var o;const e=[],t=(o=i.tileCollider)==null?void 0:o.tiles;if(!t)return;const s=t.tileSize,n=t.getByIndex;return t.getByIndex=function(c,l){return e.push({x:c,y:l}),n.call(t,c,l)},function(c,l){c.strokeStyle="blue",e.forEach(({x:d,y:h})=>{c.beginPath(),c.rect(d*s-l.pos.x,h*s-l.pos.y,s,s),c.stroke()}),c.strokeStyle="red",i.entities.forEach(d=>{c.beginPath(),c.rect(d.bounds.left-l.pos.x,d.bounds.top-l.pos.y,d.size.x,d.size.y),c.stroke()}),e.length=0}}class le{constructor(e,t,s){a(this,"image");a(this,"width");a(this,"height");a(this,"tiles");a(this,"animations");this.image=e,this.width=t,this.height=s,this.tiles=new Map,this.animations=new Map}defineAnim(e,t){this.animations.set(e,t)}define(e,t,s,n,o){const r=[!1,!0].map(c=>{const l=document.createElement("canvas");l.width=n,l.height=o;const d=l.getContext("2d");return c&&(d.scale(-1,1),d.translate(-n,0)),d.drawImage(this.image,t,s,n,o,0,0,n,o),l});this.tiles.set(e,r)}defineTile(e,t,s){this.define(e,t*this.width,s*this.height,this.width,this.height)}draw(e,t,s,n,o=!1){const r=this.tiles.get(e);r&&t.drawImage(r[Number(o)],s,n)}drawAnim(e,t,s,n,o){const r=this.animations.get(e);this.drawTile(r(o),t,s,n)}drawTile(e,t,s,n){this.draw(e,t,s*this.width,n*this.height)}}class de{constructor(e,t,s){a(this,"pos");a(this,"size");a(this,"offset");this.pos=e,this.size=t,this.offset=s}overlaps(e){return this.bottom>e.top&&this.top<e.bottom&&this.left<e.right&&this.right>e.left}get bottom(){return this.pos.y+this.size.y+this.offset.y}set bottom(e){this.pos.y=e-(this.size.y+this.offset.y)}get top(){return this.pos.y+this.offset.y}set top(e){this.pos.y=e-this.offset.y}get left(){return this.pos.x+this.offset.x}set left(e){this.pos.x=e-this.offset.x}get right(){return this.pos.x+this.size.x+this.offset.x}set right(e){this.pos.x=e-(this.size.x+this.offset.x)}}class f{constructor(e){a(this,"NAME");a(this,"tasks");this.NAME=e,this.tasks=[]}finalize(){this.tasks.forEach(e=>e()),this.tasks.length=0}queue(e){this.tasks.push(e)}collides(e,t){}obstruct(e,t,s=void 0){}update(e,t,s=void 0){}}class T{constructor(){a(this,"pos");a(this,"vel");a(this,"size");a(this,"offset");a(this,"bounds");a(this,"traits");a(this,"lifetime");a(this,"canCollide");a(this,"turbo");this.canCollide=!0,this.pos=new m(0,0),this.vel=new m(0,0),this.size=new m(0,0),this.offset=new m(0,0),this.bounds=new de(this.pos,this.size,this.offset),this.lifetime=0,this.traits=[]}addTrait(e){this.traits.push(e),this[e.NAME]=e}collides(e){this.traits.forEach(t=>{t.collides(this,e)})}obstruct(e,t=void 0){this.traits.forEach(s=>{s.obstruct(this,e,t)})}update(e,t){this.traits.forEach(s=>{s.update(this,e,t)}),this.lifetime+=e}draw(e){}finalize(){this.traits.forEach(e=>{e.finalize()})}}class A extends f{constructor(){super("killable");a(this,"dead");a(this,"deadTime");a(this,"removeAfter");this.dead=!1,this.deadTime=0,this.removeAfter=2}kill(){this.queue(()=>this.dead=!0)}revive(){this.dead=!1,this.deadTime=0}update(t,s,n){this.dead&&(this.deadTime+=s,!(this.deadTime<=this.removeAfter)&&this.queue(()=>{n.entities.delete(t)}))}}class X extends f{constructor(){super("pendulumMove");a(this,"speed");a(this,"enabled");this.enabled=!0,this.speed=-30}obstruct(t,s){(s===u.LEFT||s===u.RIGHT)&&(this.speed=-this.speed)}update(t,s){this.enabled&&(t.vel.x=this.speed)}}class B extends f{constructor(){super("physics")}update(e,t,s){e.pos.x+=e.vel.x*t,s.tileCollider.checkX(e),e.pos.y+=e.vel.y*t,s.tileCollider.checkY(e),e.vel.y+=s.gravity*t}}class P extends f{constructor(){super("solid");a(this,"obstructs");this.obstructs=!0}obstruct(t,s,n){this.obstructs&&(s===u.BOTTOM?(t.bounds.bottom=n.y1,t.vel.y=0):s===u.TOP?(t.bounds.top=n.y2,t.vel.y=0):s===u.LEFT?(t.bounds.left=n.x2,t.vel.x=0):s===u.RIGHT&&(t.bounds.right=n.x1,t.vel.x=0))}}const he=async function(){return E("goomba").then(fe)};let ue=class extends f{constructor(){super("behavior")}collides(e,t){var s;if(!e.killable.dead&&t.stomper){if(t.vel.y<=e.vel.y){(s=t.killable)==null||s.kill();return}e.killable.kill(),e.pendulumMove.speed=0}}};const fe=function(i){const e=i.animations.get("walk"),t=function(n){return n.killable.dead?"flat":e(n.lifetime)},s=function(n){i.draw(t(this),n,0,0)};return function(){const o=new T;return o.size.set(b.w,b.h),o.addTrait(new B),o.addTrait(new P),o.addTrait(new X),o.addTrait(new ue),o.addTrait(new A),o.draw=s,o}},pe=async function(){return E("koopa").then(ge)},v=Symbol("walking"),w=Symbol("hiding"),x=Symbol("panic");class me extends f{constructor(){super("behavior");a(this,"state");a(this,"hideTime");a(this,"hideDuration");a(this,"panicSpeed");a(this,"walkSpeed");this.hideTime=0,this.hideDuration=5,this.panicSpeed=300,this.walkSpeed=null,this.state=v}collides(t,s){if(!t.killable.dead&&s.stomper){if(s.vel.y<=t.vel.y){this.handleNudge(t,s);return}this.handleStomp(t,s)}}handleNudge(t,s){var n,o;if(this.state===v)(n=s.killable)==null||n.kill();else if(this.state===w)this.panic(t,s);else if(this.state===x){const r=Math.sign(t.vel.x),c=Math.sign(t.pos.x-s.pos.x);r!==0&&r!==c&&((o=s.killable)==null||o.kill())}}handleStomp(t,s){this.state===v?this.hide(t):this.state===w?(t.killable.kill(),t.vel.set(100,-200),t.solid.obstructs=!1):this.state===x&&this.hide(t)}hide(t){t.vel.x=0,t.pendulumMove.enabled=!1,this.walkSpeed===null&&(this.walkSpeed=t.pendulumMove.speed),this.hideTime=0,this.state=w}unhide(t){t.pendulumMove.enabled=!0,this.walkSpeed&&(t.pendulumMove.speed=this.walkSpeed),this.state=v}panic(t,s){t.pendulumMove.enabled=!0,t.pendulumMove.speed=this.panicSpeed*Math.sign(s.vel.x),this.state=x}update(t,s){this.state===w&&(this.hideTime+=s,!(this.hideTime<=this.hideDuration)&&this.unhide(t))}}const ge=function(i){const e=i.animations.get("walk"),t=i.animations.get("wake"),s=function(o){const r=o.behavior;return r.state===w?r.hideTime>3?t(r.hideTime):"hiding":r.state===x?"hiding":e(o.lifetime)},n=function(o){i.draw(s(this),o,0,0,this.vel.x<0)};return function(){const r=new T;return r.size.set(b.w,b.h),r.offset.y=8,r.addTrait(new B),r.addTrait(new P),r.addTrait(new X),r.addTrait(new me),r.addTrait(new A),r.draw=n,r}};class ye extends f{constructor(){super("go");a(this,"dir");a(this,"acceleration");a(this,"deceleration");a(this,"dragFactor");a(this,"distance");a(this,"heading");this.dir=0,this.acceleration=400,this.deceleration=300,this.dragFactor=R,this.distance=0,this.heading=1}update(t,s){const n=Math.abs(t.vel.x);if(this.dir!==0)t.vel.x+=this.acceleration*s*this.dir,t.jump?t.jump.falling===!1&&(this.heading=this.dir):this.heading=this.dir;else if(t.vel.x!==0){const r=Math.min(n,this.deceleration*s);t.vel.x+=t.vel.x>0?-r:r}else this.distance=0;const o=this.dragFactor*t.vel.x*n;t.vel.x-=o,this.distance+=n*s}}class we extends f{constructor(){super("jump");a(this,"duration");a(this,"velocity");a(this,"engageTime");a(this,"ready");a(this,"requestTime");a(this,"gracePeriod");a(this,"speedBoost");this.ready=0,this.duration=.3,this.engageTime=0,this.requestTime=0,this.gracePeriod=.1,this.speedBoost=.3,this.velocity=200}get falling(){return this.ready<0}start(){this.requestTime=this.gracePeriod}cancel(){this.engageTime=0,this.requestTime=0}obstruct(t,s){s===u.BOTTOM?this.ready=1:s===u.TOP&&this.cancel()}update(t,s){this.requestTime>0&&(this.ready>0&&(this.engageTime=this.duration,this.requestTime=0),this.requestTime-=s),this.engageTime>0&&(t.vel.y=-(this.velocity+Math.abs(t.vel.x)*this.speedBoost),this.engageTime-=s),this.ready--}}class be extends f{constructor(){super("stomper");a(this,"bounceSpeed");this.bounceSpeed=400}bounce(t,s){t.bounds.bottom=s.bounds.top,t.vel.y=-this.bounceSpeed}collides(t,s){!s.killable||s.killable.dead||t.vel.y>s.vel.y&&this.bounce(t,s)}}const ve=async function(){return E("mario").then(xe)},xe=function(i){const e=i.animations.get("run");function t(o){return o.jump.falling?"jump":o.go.distance>0?o.vel.x>0&&o.go.dir<0||o.vel.x<0&&o.go.dir>0?"break":e(o.go.distance):"idle"}function s(o){this.go.dragFactor=o?_:R}function n(o){i.draw(t(this),o,0,0,this.go.heading<0)}return function(){const r=new T;return r.size.set(z.w,z.h),r.addTrait(new B),r.addTrait(new P),r.addTrait(new ye),r.addTrait(new we),r.addTrait(new be),r.addTrait(new A),r.killable.removeAfter=0,r.turbo=s,r.draw=n,r.turbo(!1),r}},ke=function(i){return new Promise(e=>{const t=new Image;t.addEventListener("load",()=>{e(t)}),t.src=i})},K=async function(i){return fetch(i).then(e=>e.json())},E=async function(i){var n,o,r;const e=await K(`/@sprites/${i}.json`),t=await ke(e.imageURL),s=new le(t,e.tileW||k,e.tileH||k);return(n=e.tiles)==null||n.forEach(c=>{s.defineTile(c.name,c.index[0],c.index[1])}),(o=e.frames)==null||o.forEach(c=>{s.define(c.name,...c.rect)}),(r=e.animations)==null||r.forEach(c=>{const l=Z(c.frames,c.frameLen);s.defineAnim(c.name,l)}),s},Te=function(){const i={mario:function(){throw new Error("Function not implemented.")},goomba:function(){throw new Error("Function not implemented.")},koopa:function(){throw new Error("Function not implemented.")}},e=function(t){return s=>i[t]=s};return Promise.all([ve().then(e("mario")),he().then(e("goomba")),pe().then(e("koopa"))]).then(()=>i)},M=function*(i,e,t,s){const n=i+e,o=t+s;for(let r=i;r<n;++r)for(let c=t;c<o;++c)yield{x:r,y:c}},Ee=function(i){if(i.length===4){const[e,t,s,n]=i;return M(e,t,s,n)}else if(i.length===3){const[e,t,s]=i;return M(e,t,s,1)}else{const[e,t]=i;return M(e,1,t,1)}},Se=function*(i){for(const e of i)yield*Ee(e)},$=function*(i,e){function*t(s,n,o){for(const r of s)for(const{x:c,y:l}of Se(r.ranges)){const d=c+n,h=l+o;if(r.pattern){const p=e[r.pattern];yield*t(p.tiles,d,h);continue}yield{tile:r,x:d,y:h}}}yield*t(i,0,0)},Me=function(i,e){const t=new O;for(const{tile:s,x:n,y:o}of $(i,e))t.set(n,o,{type:s.type});return t},Le=function(i,e){const t=new O;for(const{tile:s,x:n,y:o}of $(i,e))t.set(n,o,{name:s.name});return t},ze=function(i,e){const t=i.layers.reduce((n,o)=>n.concat(o.tiles),[]),s=Me(t,i.patterns);e.setCollisionGrid(s)},Ce=function(i,e,t){i.layers.forEach(s=>{const n=Le(s.tiles,i.patterns),o=re(e,n,t);e.comp.layers.push(o)})},Ae=function(i,e,t){i.entities.forEach(({name:n,pos:[o,r]})=>{const c=t[n],l=c();l.pos.set(o,r),e.entities.add(l)});const s=ae(e.entities);e.comp.layers.push(s)},Be=async function(i){return async function(t){const s=await K(`/@levels/${t}.json`),n=await E(s.spritesheet),o=new oe;return ze(s,o),Ce(s,o,n),Ae(s,o,i),o}},Pe=function(i){const e=document.querySelector("[data-action='left']"),t=document.querySelector("[data-action='right']"),s=document.querySelector("[data-action='jump']"),n=document.querySelector("[data-action='speed']"),o={left:{elem:e,fn:function(c){H(i,c)},handle:!1},right:{elem:t,fn:function(c){j(i,c)},handle:!1},jump:{elem:s,fn:function(c){q(i,c)},handle:!1},speed:{elem:n,fn:function(c){D(i,c)},handle:!1}};["pointerdown","pointerup","pointercancel","pointerout","pointerleave"].forEach(c=>{for(const l in o){const d=o[l];d.elem.addEventListener(c,function(){if(c==="pointerdown")return d.handle=!0,d.fn(!0);d.handle&&(d.fn(!1),d.handle=!1)})}})};class Fe extends f{constructor(){super("playerController");a(this,"player");a(this,"checkpoint");this.checkpoint=new m(0,0),this.player=null}setPlayer(t){this.player=t}update(t,s,n){var o;this.player&&(n.entities.has(this.player)||((o=this.player.killable)==null||o.revive(),this.player.pos.set(this.checkpoint.x,this.checkpoint.y),n.entities.add(this.player)))}}const Ge=function(i){const e=new T,t=new Fe;return t.checkpoint.set(L.x,L.y),t.setPlayer(i),e.addTrait(t),e},Re=async function(i){const e=i.getContext("2d"),t=await Te(),n=await(await Be(t))("1-1"),o=new te,r=t.mario(),c=Ge(r);n.entities.add(c);const l=ce(n);l&&n.comp.layers.push(l),Y(r).listenTo(window),Pe(r);const h=new ee;h.update=function(g){n.update(g),o.pos.x=Math.max(0,r.pos.x-100),n.comp.draw(e,o)},h.start()},qe=document.getElementById("screen");Re(qe);