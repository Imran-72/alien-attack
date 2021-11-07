/*

1. Сделать движение игрока вверх и вниз(стрелочки вверх и вниз) done
2. Сделать выстрел, нажатием на пробел done
3. Сделать полёт пули done
4. Сделать проверку попала ли пуля в цель(муха)
5. Cделать взрыв при попадании по мухе 

*/

const player = document.querySelector("#player");
console.log(player);

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    // Нажали вниз(s)
    case 83:
      player.style.top = player.offsetTop + 10 + "px";
      break;
    // Нажали вверх(w)
    case 87:
      player.style.top = player.offsetTop - 10 + "px";
      break;
    //Нажали пробел
    case 32:
      createBullet();
      break;
    case 32:
      createBullet();
      break;
  }
});

function createBullet() {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.top = player.offsetTop + 60 + "px";
  document.body.appendChild(bullet);

  let timerId = setInterval(() => {
    bullet.style.left = bullet.offsetLeft + 10 + "px";
    if (bullet.offsetLeft > document.body.clientWidth) {
      bullet.remove();
      clearInterval(timerId);
    }
  }, 10);
}
