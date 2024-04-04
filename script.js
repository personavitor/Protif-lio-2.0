new TypeIt(".animated1",{ 
    lifeLike: false, 
    speed: 50 ,
loop: true,
})
	.type(" Vitor")
	.pause(247)
	.type(" e")
	.pause(531)
	.type(" desenvolvo")
	.pause(158)
	.type(" em")
	.pause(1006)
	.type(" HTML5")
	.pause(444)
	.type(" CSS3")
	.pause(275)
	.type(" e")
	.pause(280)
	.type(" Java")
	.pause(360)
	.type(" script!")
	.pause(1249)
	.type("")
	.pause(191)
	.type("")
	.go();


	/*script dos projetos */

	const container = document.querySelector('.container');
	const scrollRightButton = document.querySelector('.scroll-button-right');
	const scrollLeftButton = document.querySelector('.scroll-button-left');
	
	scrollRightButton.addEventListener('click', () => {
	  container.scrollBy({
		left: 400,
		behavior: 'smooth'
	  });
	});
	
	scrollLeftButton.addEventListener('click', () => {
	  container.scrollBy({
		left: -400,
		behavior: 'smooth'
	  });
	});
	


