!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict"
var t=function(){function t(t){this.running=!0,this.onendtexting=null,this.onendremoving=null,this.onbeginremoving=null,this.onbegintexting=null,this.updateElement=t}return t.prototype.update=function(t,e){this.updateElement.innerText=t.substr(0,e)},t.prototype.writeOut=function(t,e){var n=this
return new Promise((function(i,o){var r=0
n.callEvent(n.onbegintexting)
var s=setInterval((function(){if(++r,n.update(t,r),r===t.length)return clearInterval(s),n.callEvent(n.onendtexting,t),i()}),e)}))},t.prototype.writeReverse=function(t,e){var n=this
return new Promise((function(i,o){var r=t.length
n.callEvent(n.onbeginremoving)
var s=setInterval((function(){if(--r,n.update(t,r),0===r)return clearInterval(s),n.callEvent(n.onendremoving),i()}),e)}))},t.prototype.writeIteration=function(t,e,n,i){var o=this
return new Promise((function(r){return o.writeOut(t,n).then((function(){return setTimeout((function(){return o.writeReverse(t,n*i).then((function(){return r()}))}),e)}))}))},t.prototype.writeTextRandom=function(t,e,n,i,o,r){var s=this
void 0===o&&(o=.5),void 0===r&&(r=-1)
for(var u=r;u===r;)u=Math.floor(Math.random()*t.length)
this.running&&setTimeout((function(){return s.writeIteration(t[u],n,i,o).then((function(){return s.writeTextRandom(t,e,n,i,o,u)}))}),e)},t.prototype.writeText=function(t,e,n,i,o,r){var s=this
void 0===o&&(o=.5),void 0===r&&(r=0),r>=t.length&&(r=0),this.running&&setTimeout((function(){return s.writeIteration(t[r],n,i,o).then((function(){s.writeText(t,e,n,i,o,r+1)}))}),e)},t.prototype.callEvent=function(t,e){t&&t(e)},t}(),e=document.getElementById("input"),n=document.getElementById("ibeam"),i=document.getElementById("center"),o=new t(e)
function r(){n.classList.add("idle")}function s(){n.classList.remove("idle"),i.classList.remove("typed")}o.writeTextRandom(['python3 -c "print(\\"Hello World!\\")"',"sudo apt install vim","ls -la","cd /etc/","rm -R project","tar xf file.tar","ifconfig >> file.txt","sudo make install","vim ~/.vimrc","sudo chmod 755 file.sh","passwd --delete user2","su - user2","apt list | grep g++",'git commit -m "New Patch"',"sudo bash","man iwconfig","tmux attach-session -t bash_session","sudo service apache2 start","sudo apt-get upgrade","whoami","pwd",'grep -i "ten" numeric.txt',"sudo alias helloworld='echo \"Hello World!\"'","stress --cpu 8 --timeout 300s","openssl speed des des-ede3 dsa2048 hmac idea-cbc md5 aes-256-cbc","openssl aes-256-cbc -salt -pbkdf2 -in private.txt -out enc.bin"],1e3,3e3,90,.45),o.onbegintexting=s,o.onbeginremoving=s,o.onendremoving=r,o.onendtexting=function(){i.classList.add("typed"),r()}}))
