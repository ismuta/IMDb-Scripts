// ==UserScript==
// @author         r3b31 
// @license        GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @name           Site search
// @version        4.7.1
// @description    Adds title search links to the most popular torrent sites.
// @include        http://www.imdb.*/title/*
// @include        http://imdb.*/title/*
// @include        http://akas.imdb.*/title/*
// @include        http://www.akas.imdb.*/title/*
// @include        *rarbg.to*
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant   	   GM_addStyle
//original script by mungushume forked by r3b31, includes code from other open source scripts
// @namespace https://greasyfork.org/users/3202
// ==/UserScript==

//Remove ads
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)
    {
	if ((divs[i].id == 'injected_billboard')||(divs[i].id == 'injected_navstrip')||(divs[i].id == 'navboard')||(divs[i].id == 'top_ad')||(divs[i].id == 'top_rhs')||(divs[i].class == 'article native-ad-promoted-provider'))
	    divs[i].style.display = 'none';
     }

// Remove all iframes (only used for ads)
var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++)
    iframes[i].style.display = 'none';
//end of ad remover code

//Rarbg - remove sponsored results by Gingerbread Man
//https://greasyfork.org/en/scripts/5755-rarbg-remove-sponsored-results
var rarbg = document.querySelectorAll('[onclick="dd_pp_f_d();"]');
if (rarbg.length > 0) {
  for (i = 0, j = rarbg.length; i < j; i++) {
    var eachrow = rarbg[i].parentNode.parentNode;
    eachrow.parentNode.removeChild(eachrow);
  }
}

//gets the title and year of the movie
function getTitle () { 
   var metas = document.getElementsByTagName('meta'); 

   for (i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("property") == "og:title") { 
         return metas[i].getAttribute("content"); 
      } 
   } 
    return "";
}

//gets imdb code
var imdb_regex = /\/title\/tt(\d{7})\//;
var id = imdb_regex.exec(window.location.href)[1];

//where to display the icons
var div = document.evaluate ("//div[@class='subtext']", document, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

//get title only
var title = document.evaluate ("//div[@class='title_wrapper']//h1", document, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var year = getTitle();



if(div && title && year){

    title = title.cloneNode(true);

    var spant = document.evaluate (".//span", title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(spant)
    {
        title.removeChild(spant);
    }

    var titlet = title.innerHTML;
    var yeart = year;

    titlet = titlet.replace("&nbsp;",""); //delete nobreak space
    titlet = titlet.replace(/\<br\>[\s\S]*/g, ""); //remove original title
    titlet = titlet.replace(/^\s+|\s+$/g, ''); //trim the title
    titlet = titlet.replace(/[\/\\#,+()$~%.'":*?<>{}]/g, ""); //remove bad chars
    titlet = titlet.replace("&amp;","%26");//replace & with code  
    yeart = yeart.replace(/[^0-9.]/g, "");//keep numbers only
  
    if( getTitle().indexOf("TV Series") >= 0){var txt = titlet;}
    else{var txt = (titlet+" "+yeart);}//only use year in movies

    var tab = div.insertBefore(document.createElement("table"), div.firstChild);

    tab.id = "gm_links";
    _addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links td { width:50px; padding:0px } #gm_links img { margin:0 1px 0 0 } #gm_links a { vertical-align:top; font-weight:bold };");

    var tr = tab.appendChild(document.createElement("tr"));
    
  
     //PirateBay

    img = "data:text/html;charset=utf-8;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA////"+"/////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs"+"////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////"+"////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJS"+"KioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZ"+"QkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBA"+"v7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiY"+"AwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAA"+"Hx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAA"+"AAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaG"+"AAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////"+"////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////"+"q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFB"+"Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+"+"/v7+/v7+/v7+/v7+/v7+////////////AAA=";

    buildCell(tr, "PirateBay","https://piratebay.host/search/"+txt+"/0/99/200", img);
    
    //RuTracker
    
    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg4ODLy8vd3d0AAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAADPz8+KioqgoKDb29vj4+Pf39/q6uoAAAAAAAAAAAAAAAAAAAAAAAAA"+"AADe3t7b29vS0tL29vZOTk5paWlycnJ8fHy8vLwAAAAAAADt7e3c3Nzg4ODc3NympqbDw8OIiIjj"+"4+PtTUD8393///////////+8vLwAAAAAAADU1NSgoKCampqUlJSCgoLz8/NKSUni4uLpJxnqOCrw"+"Z1z2oZvj4+PPz88AAAAAAADr6+vx8fGmpqaurq7P9dn///9paWm9WlPhIBLpIRLpIRL///9XV1fO"+"zMwAAAAAAADg4OD///9D1miK5qEQyz////8+PT1GLCuTFQvNHhHhIBLrtrPPz8+kpKQAAAAAAADh"+"4eH8/PwTzEEQyz8Qyz+M5qL///9sbGxWEQyZJBy9WlO7cmzU1NSioqIAAAAAAADDw8P///8Qyz8Q"+"yz8Qyz8Qyz9r34j///+emZk+PT1lZWTS0tKmpqbg4OAAAAAAAADY2NiP56V74pVh3YAQyz////+m"+"pqZYN9DDtfT///+zoPbf39+xsbEAAAAAAAAAAAAAAAAAAAAAAAAAAAA31F/t7e2YmJhMIedAEulR"+"J+uhivSYmJi8vLwAAAAAAAAAAAAAAAAAAAAAAADj4+P+/v7IyMh2XdBAEulAEulAEunHuflKSUmY"+"mJgAAAAAAAAAAAAAAAAAAAAAAAAAAADg4ODt7e329vZaM+tAEulAEulRJ+v///9+fn7d3d0AAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAADd3d2plPV4WO/////////////e3t7j4+MAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAADr6+v///////+/v7/i4uLu7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAADV1dXp6ekAAAAAAAAAAAAAAAAAAAAAAAD+PwAA/gMAAPgDAAAAAwAAAAMAAAADAAAA"+"AwAAAAMAAAADAAAABwAA8AcAAOAHAADwAwAA/AMAAPwPAAD/PwAA";
    
    buildCell(tr, "RuTracker","http://rutracker.org/forum/tracker.php?nm="+txt, img);
    
    //CinemaGeddon
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACY0lEQVQokWXSP0wTUQAG8O/evb5yPeCO/gGvSUtJ6FIlQUPCAIIaB01IVBZjHCUMTCYOOqgDQWN0dDZR42JcJTGaGkMsDE2EYjAopGhD7T8oPaFce1zfcyIgfvtv+b5PasxO3HiUiM/9Ph6JAADQ4Lyys/Mzn291m5NXcLUfh0NQ+PzszsDpvo75TMak1KTUlOUdQmygyQWF4UiI2FpEcfb53aFzJ/3pdBqAEIJzzjn3MHj+BwBEOSVvzL24N3zEuGQsrmM5B4cfAPn+JQCAVSBwLl8cTK2UPsykWjXNsqySadf2sLENAYR9kAkA0H0pxOYCAZ6MRadnvpvFtZG+gCR53iVLqwXOBZrdOBXBevkAABCiuv74dbGZNT7eFt2xTqihzT3v2fFX8W81IiGxguTaPwBoiU4n5y/0iLoDsZFEOeUzzjy9NXT+5vvSNrJbaFLUw0Dibr9VcwBUqgAAbotyKqj3SES2iDfc2awoCt0fC5Vd4TO/trfsLWQQPQajDUEdbquY+LKkqqphGC6Xi1JKd21kNrGURWIFP/JryznYDhSGgglDAxfi4dv8iS59NZ8PhUKEEEyOYqQXXhWMMU3TAoGApmmMMbcLugf+VnnqensjPjo1Mez1emOxmEQpVRRF0zRVVSmltm1XKhVVlB5c05vaIsNRS+e/4AlKHYNvEn/GJqelaHc3c7sZY5RSANVqNZvN9ofMl+Pwe3XYJiAAwGNI7YOJNKNtmiZRSggB4DiO4zi1Wi2ow3YAu3JQ4W5O5OID4X7qkySHc8I5AKteNy1L4vXeMAItR2+HelnkPv0F7DQNIpKeZd4AAAAASUVORK5CYII%3D";
    
    buildCell(tr, "CinemaGeddon","http://cinemageddon.net/browse.php?search="+id, img);
        
    //SubScene
    
    img = "data:image/gif;base64,R0lGODlhEAAQANUAABxVdBpScBtMaBpOahtQbhtYeIeishxcfhtbfStadhpGXxpKZCxee0pvhBtWdxlCWcPQ1/Dz9RxbfBtQbNLc4hlEXKW7x6W3wxpHYBxYeVh6jRtMZhtLZhxUchpEWqa8yhpIYRxZehtPbBpIYhxXeBlIYxtSbxxaextVdeHo7BpKYxtTchtUcxpNaRlFXRpEWy1kgpatu2mNohxPbHiUpRxQbRxTcu/z9rTFzxlGXVl9kxlIYXeVpneXqhtWdP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkQyNzBGOEU3NEVDMTFFMUExNkNBOEQyNTZCMEYzREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkQyNzBGOEY3NEVDMTFFMUExNkNBOEQyNTZCMEYzREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RDI3MEY4Qzc0RUMxMUUxQTE2Q0E4RDI1NkIwRjNEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RDI3MEY4RDc0RUMxMUUxQTE2Q0E4RDI1NkIwRjNEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAQABAAAAbDwIPwgJCcQqQCCQVYBUxE4jGTcTh8rM6TgCgeYZ/fzcIIBAiiwUESaodTqR/ORKilT1PS75c1MAgTIi0tRyQOJHEWW2kDAhtIVgAyexQJAwMtAhwLBQ5MWj2UCS0cmyOeTSt0PHsQpSojIA4ANiZ0aQ17DSo7IApNZgkxBgICED8aICAYLos6excXPxEYCswudBMzLTQRexENCgo5LhWAgqQcGhoY1eUVDxOYmgsjJe0uLi8vDx6N9CWWiavwwsODg0EAADs="
    
    buildCell(tr, "SubScene","http://subscene.com/subtitles/title?q="+txt, img);
    
    //OpenSubtitles

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/"+"//////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD/"+"//////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9V"+"VVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAA"+"AAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0i"+"IiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACq"+"qqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAi"+"IiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD/////"+"//8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    
    buildCell(tr, "OpenSubtitles","http://www.opensubtitles.org/en/search/sublanguageid-all/imdbid-"+id, img);
    
    //IPT
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4jZ2QsU4bQRCGv13cUJDyxAkoQu2jiQRFKIh8SKSAKibCThnbj4DFC0BF/ABRREVS0xqEQYl8FGlwuLQuLuJAlosz3nAYdilILBAuOP5qZqTvm9EIgLm5N6+llDMkiNb6qFbb/yEWFt5Oa23qQgiZRGCM0b3e1Yw0hsWkMIAQQgoh30tgKCl8TzKc+t/MuxlcN8NqeY1SscDk5EsA6nWP6u4e3W53oKR/umVZOOk0QB8GKBY+8iGfA2Dry2fyuZWHAq31QPPxcYPV8hqed4TjpCkVC1iWxbyboVQsAGCMNjIMw0tjzCPB1JRDPreC4zg0Gr+o7u7dif/VxhjOzs7jVKvVulJKoZQCoN1uc927xrZHmZgYZ7NS4fDgkM7FBQDNZhPP84iiCKVULwWglKLT6QAQBAFxHLP99RubnyoDPg9hGD5+4lPi+79ZzmZZzr7rz4ZGRl7MAi7ibnvd8wA48X2CIHggqNUOuIxjoijixPcBvgvbHisD60kuuZcNCdw8Ewb4K4HqMyU3wI4AsO2xV8ASMPpEOAR2Tk///LwFay2vA+9SBSUAAAAASUVORK5CYII=";
    
    buildCell(tr, "IPT","http://www.iptorrents.com/t?q=tt"+id, img);
    
    //Rottentomatoes
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACjlBMVEUAAABUiz0/ejkzdDmBxU1pnUFnnkJjmkBcgzhSbjFchzpkmkBYjDtdkD1ilz9elD9WfTZOWSlXdzRllD9/hDyuYTVnhDpdiDpbjjxVjz5QeDZgjz5vjT1xjT5xkj9V91yIYTKJazWDbzWFbTSaWTCRYjKAczZygDlhizvyFyPEMyi6QirLQirHMyiwQiu+OCn2DyLtHCTqJCXoHSTpHiTtHCTtHiTuKibtHCTsHCTtHyTuMCboHCTjHCPtHiTaGyLSGiHtHSTtJyXCGB65Fx3tHCTtHySlFBieEhbtHCTtHCTtHySTDxKGDA6ECw3tHCTtHCTtHCTtHCSECw11BgdvBQVpAALtHCTtHCTtHCToHCTgGyPUGiGgEhaKDQ93BwloAwNgAQE+AADvHCTqHCThGyPTGiLBGB+uFRuZERWFCw5yBgdkAQJYAAAAAABDcjZBWCxvgjpZkD9TiDxflT96eznXRCqibDR0jDyUZzN9eziAfzrQNCngIiXpNifXUS20azSUfzimcTXgQyrKPimMbzbCRS3vGyTuGyTvSSvlaDTagD7ahEDpcDjxUy7sNCe/QyzFPyztHCTtHCTtHCTwVS70djv5lkz6nFD2gkDxYDLvOynhKifZKyftHCTtHCTsHCTuLybwUi7zczn3kUn3lkz1fj7xXjHvOijsIiXrHSTsHCTpHCTkHCPvRCrxYDHzczn0dzvyaDTwTizuLyftHiTrHCTmHCPdGyLRGiHuLibvQyrwUi7wVC7wSSvvNifsIiXoHCThGyPWGiHHGSC2FhztJiXuLybuMCbtKiXqISTjHCPaGyLMGSC7Fx2nFBntHSTrHSTmHCPdGyPRGiHCGB6vFhqaERXGGR+0Fhyr0MXzAAAAb3RSTlMAM5AhAAAEJGe7XxMIJmK14vbOfhsDC2vi/v7op2UfAQhVxPz+8bJGBQVU2P79y0MDNsP+sSaE8uppv/35oM77r7f8+Jl37uVeKLL9+58cA0PJ/Pq6NAIDPKLl+f//99+UMAEBG16k1+zq0pxUFQBbu/doAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAASAAAAEgARslrPgAAAQdJREFUGNNjYAADRiZmFgYYYGVgY+fg5OKGC/Dw8vELCAoJi4hCBcTEJSTzC6SkZWTl5EF8BUUl5cKi4pJSFVU1dQ0GBk0tbZ2y8orKquqaWl09fQMGQ6O6+obGpuaW1rb2DmMTUwYz886u7p7evv4JEydNnmJhyWBlPXXa9BkzZ82eM3fe/AU2tgx2CxctXrJ02fIVK1etXrPW3oHB0Wnd+g0bN23esnXb9h07nV0YXN127d6zd9/+AwcPHT5y1N2DwdPL+9jxEydPnT5z9tx5H18/Bv+AwKALFy9dvnL12vXgkNAwBobwiMio6JgbN2Pj4hMSk0BuT05JTUvPyMzKzsnNY2AAADTxXGbinCjBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTA3VDE1OjI1OjQ0LTA3OjAwII+MNQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0wN1QxNToyNTo0NC0wNzowMFHSNIkAAAAASUVORK5CYII=";
    
    buildCell(tr, "Rottentomatoes","http://www.rottentomatoes.com/search/?search="+titlet, img);
    
    //Eksi
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbklEQVR42mNgwAMC1zkLh65y4GEgEzBGbnP1Dd/sGmE805iVZN0B6x0EorZ6TInc6rElaJuDDMkGhO9004ne7nEvepvHh4jNLs6k6a5nYIre5lYQvc3rb/Q2z/9RWz1nhq4KZSZaf+gqLbaore4nY7Z7/QfhqO2eP9xXWQoRbUDYRie76O2e/2AGgA3Z5t5KdOin7Q7dVn+08H/evrj/IC+ADACGx1PPVbaiBHUHb3GzWn593s8HH+7833V/0//cfbFQAzz/RW51LSNoQOQ2jyVHn+z//+/fv/9X31z8X3owDeGNrZ7nvZfaCOIJPQbmqO0eV9N3h/1fc2vR/+bjZf+RwwEYpQ9Dt7oaEHLBHmRNqAHpedNvg7UU/gS03TUUGHCf0TWDwiB6i9skUCDjNcD4DAMrMMrKo7e534VFJdDmtxFb3eZEE5ukHeYrcIRtc7GI2O4eG7nVPSVis4ezzzIHEdLzIzBJh65iwJuEAUCOyHpeLFiIAAAAAElFTkSuQmCC";
    
    buildCell(tr, "Eksi","http://eksisozluk.com/?q="+titlet, img);
      
    //KickAss

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAA"+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdsc"+"PEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2"+"iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc"+"/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//"+"XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9F"+"gZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeB"+"k/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAA"+"AC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/"+"KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9U"+"kKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Sm"+"tf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv//////////////////////////"+"//////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn/"+"/////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9n"+"obL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ul"+"tv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9"+"xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAA"+"AAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAA"+"AAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAB"+"AADAAQAAxjMAAA==";

    buildCell(tr, "KickAss","http://kat.cr/usearch/"+titlet+"/", img);
        
    //KaraGarga
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIUlEQVR42mN4u4jhPwgzkAtgBpBtyNwWn/+Zca7/S2LU/1+cIki6Ia8WMv3Pi7P+r6en99/Hx+f/kmpF0g3pL7H8b2Vl9d/Jyem/qanJ/6X12v9BBhNtwPoOk//hIb5gzSEhIf8jIiL+1+b7/d/WqU68QSBb5eXl/7u5uYG94unp+T8tLe1/a7Ev2CCiwkJCTBjsFZALQJpzcnLAGGQYUYEMsgnkClBYGBsb/7ezswO7COQtEAbF1vZWKdyGvFjE9T/OWwmsGWQQLy8v2FUgtpGREdhAkOF4DTk5AxKdfs46//vyteEY5AWQGMgloGgHhRmGZlDIgwINhEExg80CUDopT9AHG4rhf1CqBBmSlRb7v6+nDYzxZQG8+YLiTEY3AAD9Uss84PK/lwAAAABJRU5ErkJggg==";
    
    buildCell(tr, "KaraGarga","https://karagarga.in/browse.php?search="+id+"&search_type=imdb", img);
    
    //IcheckMovies
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVR42pVTXUiTURg+FwVFhdFdF+bmnG5uzv0o5tT92H7a1v7a3MrQUOgm0LVFP0Zhed1FZP5cdVFEUGipoYg6yfCiQAWRQqygEPHCBHN/urWncw6kBXXR+XjO4Xzv+zzv837nfITQEQwG4fP5/guMw7jE7XYjEAjA7/fvgCWw9w6Hg8PlcvF3PO6jcbq6gwHcqLSAC3i9Xk7weDycYLPZEImE0d3did7eLrS1XYfT6YTdZofL64Gb5nVKdRjL0YCwAKvAVovFgubmJszNvUMmEweQQjbLkMTS0ntErl7BKctJPMrTYvxIOS5Um0DsdjsYzGYzGhsbsLa2QskJxGLru9hcR5qKra18wbO8agwfVuO8wYpahw3EarXyyjqdHtPTr8FG4kcCiUxsRyCe3OAib/RnMXJIiSa9GQabFWaTGcRkMkGv16OBVk9tbWKh4x6i5R58ftJHa24hFl9Hkj5vz11CPxFgpX8Y1+7cQnVVFYxGI4jBYEBFxXFELoeRzWxj5uJNvCRiDO6T4dPj58hQRx/u9qKPHMNcuIM77Ol5gLKycupaB1JTU0M3ZQiFWpGlFVPYxmzoNgb2SDBytBIfHz7FqxwVJlRO2sY3Sk+jq+s+lEoVqqgLotVqodFo6DmfRir1nffLMFnpw9BBBYYOKDC4X47lsUkk6WmAFgmFWlBaWkqdV4CwiQkUFxcjGh3lCewjLo9GMbBXihekgPefpN7S6TgWFxegUqmgVqu5c8ImpVLJBUymE1hd/crPP57awGxrO2Zb2rGxuowMvQ9J6qy+/gyKioo4h4EwNblcDplMBpGoALW1RkxNTfALtDvSmJ+f4W3m5+fzXMYpKSkBUSgUkEqlkEgkHCKRCAKBkN5OJ+81HG5FXZ0fYrEYQqFwJ49xmBBhG2apsLDwD7Dk3NxcDoFAwAV+j//i8D+S9f83kX+B5TIHjPsTZhVHT7FwsBcAAAAASUVORK5CYII=";
    
    buildCell(tr, "IcheckMovies","http://www.icheckmovies.com/search/movies/?query=tt"+id, img);
    
    //DivxPlanet
    
    img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAADh0lEQVR42nWTa0xbdRjGz+ZlI0sXKAd6Oef86aB0sPDBRDKDRr4YvyzToaXLBAZTlIuIlEETW7Atd8qlWQq1DLZBBghjzozMcVk0+7CZoG4fFhInuAKHsrl10AMt5xxaTvvaopKY6PvxnzxPnvd5f38M+3vAhO3lTDLEtsneY7tJ48b5lJzIW2AET2fH8FdhHBdh/zdQhL3kMUnS2FZZA2cl5jkHEta6jlyFMVK8/U1c7/Y1/Ofta7EGmNx3GCawff8Su0wHxat18W97WsgZ1koG+W4U8nSl/jL7EZ7O9CaoNwdImhuVCsIUHhKmRbPC1IF8uB0dvWvwvFVW7LHK73q7CeB6SGDtyrmFKipTk5ERNa9NSF3SJ5c/aU+88Pw84d6axkPB70UuYSLms92VVu2SO+sXpALbLwX+UtKGx6o6rVarXztbres1mpt0FkvnW1NfvKucLZOfenKOoP3TOAiTMU7hesyxSEeYu0O2uvF1PHBXJMD3K2+ATRmnVp/M+tJUJ7S0dTA2u+O3/oHLPwwOj5gfViUVuHsINnhLHBLG8e92Uixrya1n9QR4HQT4HKTJZSWjsrKyFLVGM1jaO6HL7oBLA4OhweHR9VuGY6/QzcTM1s04ECbEW/xQdCZGl1HMipaCVT2CjQ6VDS4eFmk0mpfz8vIXtJVVYKg1QUNTK9vc3J7xe6744IqFsvPjUghOx4B/LLYRWywlHyyXI3iqQ7DemPTIb1MeCVez9/3s7PKi4lJeW1k9r9Pp34z09ahEEv+4Ad3kR2SRHiDwLT6EOYso61IZCjyuRLBmQEGvJXmAtyYnqo8fT/kgN89eUFiYGdbuiRjQOvSGuz1xje8lwT8sgcAVvAd7+KH8dWcx+eNOimoETC0SfC3KG35rYk7AoTrq70tLhX7F/ojBU7Py6mb3IeBsJPDnwsz0xedji2ew/Ysfy08slpBzroq/VvHUJIR8TQrG13pohu1UfBUGjKDL8XeYNhXLdVLAtiFgW9A9rlFO7bDw4LTkwFKJLJf+lPh15XMqFDHZKdWIgj4z1eTVi2Ld9an3N5sVsNmIwFePnL564mSYgxd3iYwkWSiUHqVLyCFXBbX9x1kq5NZRd3wGSdpyhcywVpfsZ2qQwNRQP3mN8hNQSUb917/a49JgUc5PRCq6lNDTZUSBKXwRV0Oa+ZmOuujWSrMZLRYNGuyFfwR/AnjwwrbkLWbSAAAAAElFTkSuQmCC";
    
    buildCell(tr, "DivxPlanet","http://altyazi.org/index.php?page=arama&arama=tt"+id, img);
    
    //TurkceAltyazi
    
    img = "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADo7PAUbqPajmKg3ppioN6aYqDemmKg3ppioN6aYqDemmKg3ppioN6aYqDemmKg3ppioN6aYqDemmyj2pDk6e4Ygq3aewB8+v0Affv9AH37/QB7+P0AefX9AHn1/QB59f0AefX9AHn1/QB59f0Ae/n9AH37/QB9+/0AfPr9eKnahmih3JQAffv9AH37/QB8+f2VueP91d/u/dXf7v3V3+791d/u/dXf7v3U3+79gLDl/QB8+v0Affv9AH37/WKg35pioN+aAH37/QB9+/0AfPr9C3rt/anG6P3////9/////f////3////9lLrm/Ql67/0Affv9AH37/QB9+/1ioN+aYqDfmgB9+/0Affv9AH37/QB9+/2Gtej9/////f////3////9/////Wem6f0Affv9AH37/QB9+/0Affv9YqDfmmKg35oAffv9AH37/QB9+/0Affv9hrXo/f////3////9/////f////1npun9AH37/QB9+/0Affv9AH37/WKg35pioN+aAH37/QB9+/0Affv9AH37/Ya16P3////9/////f////3////9Z6bp/QB9+/0Affv9AH37/QB9+/1ioN+aYqDfmgB9+/0Affv9AH37/QB9+/2Gtej9/////f////3////9/////Wem6f0Affv9AH37/QB9+/0Affv9YqDfmmKg35oAffv9AHz6/QB9+/0Affv9hrXo/f////3////9/////f////1npun9AH37/QB9+/0AfPr9AH37/WKg35pioN+aF4Hu/Y+66v0Pfe/9AH37/Ya16P3////9/////f////3////9Z6bp/QB9+/0zjOr9gLHn/QB69v1ioN+aYqDfmkST5/3////9XJ/n/QB8+v2Gtej9/////f////3////9/////Wem6f0AfPn9qMbp/e7x9/0Cdu79YqDfmmKg35pFk+f9/////cna7/0Hee/9hrXo/f////3////9/////f////1npen9LIXk/ff5+/3u8fb9Anbt/WKg35pioN+aRZPn/f////3////9nMDp/Ya16f3////9/////f////3////9baDc/env9v3////97vH3/QJ27v1ioN+aZqHdlhSB8f1Llub9S5bm/TOL6f0niOz9S5bm/UuW5v1Llub9S5bm/SGD6v1Jlef9S5bm/UaU5/0Ae/f9YqDfmn6r2n4AfPr9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AHz6/XKl2org5uwcWJjYpUKP3rtCj967Qo/eu0KP3rtCj967Qo/eu0KP3rtCj967Qo/eu0KP3rtCj967Qo/eu1SV2Kjc5OwhgAEAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAEAAA=="
    
    buildCell(tr, "TurkceAltyazi","http://www.turkcealtyazi.org/find.php?cat=sub&find=tt"+id, img);
    
    
}

function buildCell(container, title, href, image){
    var a = document.createElement("a");

    if ((title == "Subs4free")||(title == "Btscene")||(title == "Podnapisi")) {
	href = href.replace(/\s/g, "+"); //replace spaces with +'s
	}
    
	a.href = href; 
    a.setAttribute("target","_blank");
	a.title=title;	
    var img = document.createElement("img");
    img.src = image;
	img.setAttribute("height","16");//needed for Chrome
	img.setAttribute("witdh","16");//needed for Chrome

    a.appendChild(img);
    var cell = container.insertCell(0);
    cell.appendChild(a);
}

function _addStyle(css){
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.innerHTML = css;
            heads[0].appendChild(node); 
        }
    }
}
