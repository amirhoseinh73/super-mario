var m=Object.defineProperty;var p=(r,e,t)=>e in r?m(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(p(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const l=function(r){return new Promise(e=>{const t=new Image;t.addEventListener("load",()=>{e(t)}),t.src=r})},w=async function(r){return fetch(`/@levels/${r}.json`).then(e=>e.json())};class u{constructor(e,t,i,s){c(this,"image");c(this,"width");c(this,"height");c(this,"context");c(this,"tiles");this.image=e,this.context=t,this.width=i,this.height=s,this.tiles=new Map}define(e,t,i){var n;const s=document.createElement("canvas");s.width=this.width,s.height=this.height,(n=s.getContext("2d"))==null||n.drawImage(this.image,t*this.width,i*this.height,this.width,this.height,0,0,this.width,this.height),this.tiles.set(e,s)}draw(e,t,i){const s=this.tiles.get(e);this.context.drawImage(s,t,i)}drawTile(e,t,i){this.draw(e,t*this.width,i*this.height)}}const a=16,h={sky:{X:3,Y:23},ground:{X:0,Y:0},mario:{X:16,Y:3}},y=function(r,e){r.ranges.forEach(([t,i,s,n])=>{for(let o=t;o<i;o++)for(let d=s;d<n;d++)e.drawTile(r.tile,o,d)})},I="/assets/tiles-1dcaf0e0.png",E="/assets/characters-802da64a.gif",f={tiles:I,characters:E},L=async function(){return l(f.characters).then(r=>{const e=new u(r,g,a,a),t=h.mario;return e.define("mario",t.X,t.Y),e})},v=async function(){return l(f.tiles).then(r=>{const e=new u(r,g,a,a),t=h.ground;e.define("ground",t.X,t.Y);const i=h.sky;return e.define("sky",i.X,i.Y),e})},S=document.getElementById("screen"),g=S.getContext("2d");Promise.all([L(),v(),w("1-1")]).then(([r,e,t])=>{t.backgrounds.forEach(i=>{y(i,e)}),r.draw("mario",64,64)});
