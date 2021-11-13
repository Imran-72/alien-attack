/*

1. Сделать движение игрока вверх и вниз(стрелочки вверх и вниз) done
2. Сделать выстрел, нажатием на пробел done
3. Сделать полёт пули done
4. Сделать проверку попала ли пуля в цель(муха) done
5. Cделать взрыв при попадании по мухе done

*/

const startGame = document.createElement("div");
startGame.className = "startGame";
startGame.textContent = "Press-enter to Start-Game";
document.body.prepend(startGame);
let startClick = 13;
document.addEventListener("keydown", (event) => {
  if (event.keyCode == startClick) {
    startClick = 0;
    let gamePause = 27;
    const docClientHeight = document.documentElement.clientHeight;
    const player = document.createElement("div");
    player.setAttribute("id", "player");
    player.className = "skin_2";
    document.addEventListener("keydown", (event) => {
      if (event.keyCode == gamePause) {
        alert("Пауза игры");
      }
      // if (event.keyCode == 83) {
      //   player.style.top = player.offsetTop + 100 + "px";
      //   if (player.offsetTop >= docClientHeight - 160) {
      //     player.style.top = player.offsetTop + 0 + "px";
      //     console.log(player.offsetTop);
      //   }
      // }
      // if (player.offsetTop >= 400) {
      //   player.style.top = player.offsetTop + 0 + "px";
      // }
      // if (event.keyCode == 87) {
      //   player.style.top = player.offsetTop - 100 + "px";
      //   console.log(player.offsetTop);
      //   if (player.offsetTop <= docClientHeight - player.offsetTop) {
      //     player.style.top = player.offsetTop - 0 + "px";
      //   }
      // }
      // if (player.offsetTop === 88) {
      //   player.style.top = player.offsetTop + 10 + "px";
      // }
      // if (event.keyCode == 32) {
      //   createBullet();
      // }
      switch (event.keyCode) {
        // Нажали вниз(s)
        case 83:
          player.style.top = player.offsetTop + 100 + "px";
          console.log("player", player.offsetTop);
          console.log(document.clientWidth);
          break;
        // Нажали вверх(w)
        case 87:
          player.style.top = player.offsetTop - 100 + "px";
          break;
        //Нажали пробел
        case 32:
          createBullet();
          break;
      }
    });

    // Создание пули
    function createBullet() {
      // Создаём блок для пули
      const bullet = document.createElement("div");
      // Даём класс пули
      bullet.className = "bullet";
      // Задаём начальное значение позиции пули
      bullet.style.top = player.offsetTop + 60 + "px";
      // Добавляем пулю на игровое поле
      document.body.appendChild(bullet);

      bulletMove(bullet);
    }

    function bulletMove(bullet) {
      // Создаём таймер для движения пули
      let timerId = setInterval(() => {
        // Двигаем пулю вправо
        bullet.style.left = bullet.offsetLeft + 10 + "px";
        // Проверяем попала ли пуля в мишень
        isShot(bullet, timerId);
        if (bullet.offsetLeft > document.body.clientWidth) {
          bullet.remove();
          clearInterval(timerId);
        }
      }, 10);
    }

    let kill = 0;

    function isShot(bullet, timer) {
      // Координаты вверхней и нижней точки пули
      let topB = bullet.offsetTop;
      let bottomB = bullet.offsetTop + bullet.offsetHeight;

      // let enemy = document.querySelector(".enemy");
      let enemy = document.querySelector(".enemy_2");
      if (enemy != null) {
        // Координаты верхней точки противника
        let topE = enemy.offsetTop;
        let bottomE = enemy.offsetTop + enemy.offsetHeight;

        let leftB = bullet.offsetLeft;
        let leftE = enemy.offsetLeft;

        if (topB >= topE && topB <= bottomE && leftB >= leftE) {
          enemy.className = "boom";
          enemy.style.top = topE + "px";
          enemy.style.left = leftE + "px";
          clearInterval(enemy.dataset.timer);
          setTimeout(() => {
            enemy.remove();
            ++kill;
            killcounter(kill);
            createEnemy();
            clearInterval(timer);
            bullet.remove();
            if (topB > topE && bottomB < bottomE) {
              bullet.remove();
            }
          }, 1000);
        }
      }
    }

    // Создание врага
    function createEnemy() {
      const enemy = document.createElement("div");
      // enemy.className = "enemy";
      enemy.className = "enemy_2";
      enemy.style.top = random(500, document.body.offsetHeight - 10) + "px";
      document.body.append(enemy);

      let timerId = setInterval(() => {
        enemy.style.left = enemy.offsetLeft - 10 + "px";
        let kils = enemy.offsetLeft + enemy.offsetWidth;
        if (kils < 400) {
          enemy.remove();
          playerDie(kils, enemy);
          clearInterval(timerId);
          createEnemy();
        }
      }, 100);
      enemy.dataset.timer = timerId;
    }

    createEnemy();

    function random(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    // Создание элемента жизней
    const lifesBlock = document.createElement("div");
    lifesBlock.setAttribute("id", "lifes");

    for (let i = 0; i < 3; i++)
      lifesBlock.appendChild(document.createElement("span"));

    document.body.append(lifesBlock);

    // Создания элемента счётчика убийств
    let countingMurdersBlock = document.createElement("div");
    countingMurdersBlock.className = "countingMurdersBlock";

    let countingMurders = document.createElement("span");

    countingMurdersBlock.append(countingMurders);
    document.body.append(countingMurdersBlock);

    // Счётчик убийств
    function killcounter(kill) {
      countingMurders.textContent = `Kills - ${kill < 10 ? "0" + kill : kill}`;
    }

    let lifes = 3;

    function playerDie(kill) {
      --lifes;
      if (kill < 400) {
        const lifesBlock = document.querySelector("#lifes");
        const life = lifesBlock.querySelector("span");
        life.remove();
        player.className = "boom";
        setTimeout(() => {
          player.className = "skin_2";
        }, 1000);
        endGame(lifes);
      }
    }

    function endGame(lifes) {
      if (lifes == 0) {
        setTimeout(() => {
          alert("End-Game");
          location.reload();
        }, 100);
      }
    }

    startGame.remove();
    document.body.append(player);
  }
});
