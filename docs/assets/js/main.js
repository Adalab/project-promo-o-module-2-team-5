"use strict";const legendDesign=document.querySelector(".js-legendDesign"),legendFill=document.querySelector(".js-legendFill"),legendShare=document.querySelector(".js-legendShare"),sectionDesign=document.querySelector(".js-sectionDesign"),sectionFill=document.querySelector(".js-sectionFill"),sectionShare=document.querySelector(".js-sectionShare"),arrowDownDesign=document.querySelector(".js-arrowdown-design"),arrowUpDesign=document.querySelector(".js-arrowup-design"),arrowDownFill=document.querySelector(".js-arrowdown-fill"),arrowUpFill=document.querySelector(".js-arrowup-fill"),arrowDownShare=document.querySelector(".js-arrowdown-share"),arrowUpShare=document.querySelector(".js-arrowup-share");function toggleDropDownMenu(){sectionDesign.classList.toggle("collapsed"),arrowDownDesign.classList.toggle("collapsed"),arrowUpDesign.classList.toggle("collapsed")}function handleClickDropdown(){toggleDropDownMenu()}function toggleDropDownFill(){sectionFill.classList.toggle("collapsed"),arrowDownFill.classList.toggle("collapsed"),arrowUpFill.classList.toggle("collapsed")}function handleClickDropdownFill(){toggleDropDownFill()}function toggleDropDownShare(){sectionShare.classList.toggle("collapsed"),arrowDownShare.classList.toggle("collapsed"),arrowUpShare.classList.toggle("collapsed")}function handleClickDropdownShare(){toggleDropDownShare()}function handleClickLegendDesign(){sectionDesign.classList.contains("collapsed")?(sectionFill.classList.toggle("collapsed"),sectionShare.classList.toggle("collapsed")):(sectionFill.classList.add("collapsed"),sectionShare.classList.add("collapsed"))}function handleClickLegendFill(){sectionFill.classList.contains("collapsed")?(sectionDesign.classList.toggle("collapsed"),sectionShare.classList.toggle("collapsed")):(sectionDesign.classList.add("collapsed"),sectionShare.classList.add("collapsed"))}function handleClickLegendShare(){sectionShare.classList.contains("collapsed")?(sectionDesign.classList.toggle("collapsed"),sectionFill.classList.toggle("collapsed")):(sectionDesign.classList.add("collapsed"),sectionFill.classList.add("collapsed"))}legendDesign.addEventListener("click",handleClickDropdown),legendFill.addEventListener("click",handleClickDropdownFill),legendShare.addEventListener("click",handleClickDropdownShare),legendDesign.addEventListener("click",handleClickLegendDesign),legendFill.addEventListener("click",handleClickLegendFill),legendShare.addEventListener("click",handleClickLegendShare);const previewName=document.querySelector(".js-preview_name"),previewJob=document.querySelector(".js-preview_job"),form=document.querySelector(".js-form");let data={name:"",job:"",email:"",phone:"",linkedin:"",github:"",palette:"01"};function renderInputs(){""===data.name?previewName.innerHTML="Nombre Apellido":previewName.innerHTML=data.name,""===data.job?previewJob.innerHTML="Front-end developer":previewJob.innerHTML=data.job}function handleFill(e){const t=e.target.id,o=e.target.value;data[t]=o,renderInputs(data)}form.addEventListener("keyup",handleFill);const previewHeaderStrip=document.querySelector(".js-card-preview-header"),socialMediaIcon=document.querySelectorAll(".socialmedia_icon"),socialMediaCircle=document.querySelectorAll(".card__socialmedia--item"),paletteButtons=document.querySelectorAll(".js-sectionDesign input[name=colourpalette]");function handler(){const e=document.querySelector(".js-sectionDesign input[name=colourpalette]:checked").value;let t,o,l;"colours1"===e?(t="#114e4e",o="#438792",l="#a2deaf",data.palette="01"):"colours2"===e?(t="#420101",o="#bd1010",l="#e95626",data.palette="02"):"colours3"===e&&(t="#3e5b65",o="#eab052",l="#a0c0cf",data.palette="03");for(const e of socialMediaIcon)e.style.color=t;for(const e of socialMediaCircle)e.style.borderColor=l;previewHeaderStrip.style.borderColor=o,previewName.style.color=t}paletteButtons.forEach(e=>{e.addEventListener("change",handler)});const shareButton=document.querySelector(".js-buttonCard"),createdCard=document.querySelector(".js-createdCard"),createdCardLink=document.querySelector(".js_createdCard__link"),catchError=document.querySelector(".js_catchError"),twitterBtn=document.querySelector(".js-buttonLink");function handleClickButton(e){e.preventDefault(),fetch("https://awesome-profile-cards.herokuapp.com/card",{method:"POST",body:JSON.stringify(data),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{if(e.success){createdCardLink.innerHTML=e.cardURL,createdCardLink.href=""+e.cardURL;const t="Mira la tarjeta que me he creado!!!";twitterBtn.href=`https://twitter.com/intent/tweet?text=${t}url=${e.cardURL}`,shareButton.classList.add("buttonCard--off"),shareButton.classList.remove("buttonCard--on"),createdCard.classList.remove("collapsed"),catchError.innerHTML=""}else catchError.innerHTML="Error: debes rellenar todos los campos"})}shareButton.addEventListener("click",handleClickButton);const fr=new FileReader,fileField=document.querySelector(".js__profile-upload-btn"),profileImage=document.querySelector(".js__profile-image"),profilePreview=document.querySelector(".js__profile-preview");function getImage(e){const t=e.currentTarget.files[0];fr.addEventListener("load",writeImage),fr.readAsDataURL(t)}function writeImage(){profileImage.style.backgroundImage=`url(${fr.result})`,profilePreview.style.backgroundImage=`url(${fr.result})`,data.photo=fr.result}fileField.addEventListener("change",getImage);const buttonReset=document.querySelector(".js-card_reset"),resetName=document.querySelector(".js-full_name"),resetJob=document.querySelector(".js-job"),resetEmail=document.querySelector(".js-email"),resetPhone=document.querySelector(".js-phone"),resetLinkedin=document.querySelector(".js-linkedin"),resetGithub=document.querySelector(".js-github");function handleClickReset(){data={name:"",job:"",email:"",phone:"",linkedin:"",github:"",palette:"colours1"},previewName.innerHTML="Nombre Apellido",previewJob.innerHTML="Front-end developer",previewHeaderStrip.style.borderColor="#438792",previewName.style.color="#114e4e",previewJob.style.color="#000000";for(const e of socialMediaIcon)e.style.color="#114e4e";for(const e of socialMediaCircle)e.style.borderColor="#a2deaf";profilePreview.style.backgroundImage="";const e=document.querySelector(".js-sectionDesign input[name=colourpalette]:checked");e&&(e.checked=!1),resetName.value="",resetJob.value="",resetEmail.value="",resetPhone.value="",resetLinkedin.value="",resetGithub.value="",fileField.value="",profileImage.style.backgroundImage="",shareButton.classList.remove("buttonCard--off"),shareButton.classList.add("buttonCard--on"),createdCard.classList.add("collapsed")}buttonReset.addEventListener("click",handleClickReset);const socialMediaItems=document.querySelectorAll(".card__socialmedia--item a");function handlerSocialMediaItemsClick(e){e.preventDefault()}socialMediaItems.forEach(e=>{e.addEventListener("click",handlerSocialMediaItemsClick)});