/*

1. Сделать движение игрока вверх и вниз(стрелочки вверх и вниз) done
2. Сделать выстрел, нажатием на пробел done
3. Сделать полёт пули done
4. Сделать проверку попала ли пуля в цель done
5. Cделать взрыв при попадании пули по цели done

*/

// Создаём кнопку для старта игры
const startGame = document.createElement("div");
startGame.className = "startGame";
startGame.textContent = "PRESS ENTER TO START GAME";

let startClick = 13;
let clickClass = 0;

document.addEventListener("keydown", (e) => {
  if (e.keyCode == startClick) {
    startClick = 0;
    startGame.remove();

    // Создаём кнопку для паузы игры
    const gamePause = 27;

    const docClientHeight = document.documentElement.clientHeight;

    // Создаём игрока
    const player = document.createElement("div");
    player.setAttribute("id", "player");

    // Создание блока выбора игрока
    const textBlock = document.createElement("div");
    textBlock.className = "textBlock";
    textBlock.textContent = "Выберите игрока";

    const playersBlockWrapper = document.createElement("div");

    const playersBlock = document.createElement("div");
    playersBlock.setAttribute("id", "root");

    const playerCard = document.createElement("span");
    playerCard.className = "playerCard";
    const playerCard_2 = document.createElement("span");
    playerCard_2.className = "playerCard_2";

    const player_1 = document.createElement("div");
    player_1.className = "player_1";
    const player_2 = document.createElement("div");
    player_2.className = "player_2";

    playerCard.append(player_1);
    playerCard_2.append(player_2);
    playersBlock.append(playerCard);
    playersBlock.append(playerCard_2);
    document.body.append(playersBlock);
    document.body.prepend(textBlock);

    root.addEventListener("click", (e) => {
      if (e.target == playerCard || e.target === player_1) {
        player.className = "skin_1";
        clickClass = 1;
      }
      if (e.target == playerCard_2 || e.target === player_2) {
        player.className = "skin_2";
        clickClass = 2;
      }

      document.addEventListener("keydown", (e) => {
        let killCounterBlock = document.querySelector(".killCounterBlock");

        if (e.keyCode == gamePause) {
          alert("PAUSE");
        }

        switch (e.keyCode) {
          // Нажали вниз(s)
          case 83:
            player.style.top = player.offsetTop + 100 + "px";
            break;
          // Нажали вверх(w)
          case 87:
            player.style.top = player.offsetTop - 100 + "px";
            break;
          // Нажали пробел
          case 32:
            createBullet();
            break;
        }

        if (e.keyCode == 83 && player.offsetTop >= docClientHeight - 200) {
          player.style.top = player.offsetTop + 0 + "px";
        }

        if (
          e.keyCode == 87 &&
          player.offsetTop <= killCounterBlock.offsetTop + 50
        ) {
          player.style.top = player.offsetTop - 0 + "px";
        }
      });

      // Создание пули
      function createBullet() {
        const bullet = document.createElement("div");
        bullet.className = "bullet";

        // Задаём начальное значение позиции пули
        bullet.style.top = player.offsetTop + 60 + "px";
        document.body.append(bullet);

        bulletMove(bullet);
      }

      // Создание функции для движении пули
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

      // Счётчик убийств
      let kill = 0;

      function isShot(bullet, timer) {
        // Координаты вверхней и нижней точки пули
        let topB = bullet.offsetTop;
        let bottomB = bullet.offsetTop + bullet.offsetHeight;

        let enemy = document.querySelector(
          clickClass == 1 ? ".enemy_1" : ".enemy_2"
        );

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
        enemy.className = "enemy_" + (clickClass == 1 ? "1" : "2");
        enemy.style.top = random(80, document.body.offsetHeight + 450) + "px";

        const timerId = setInterval(() => {
          enemy.style.left = enemy.offsetLeft - 10 + "px";
          const kils = enemy.offsetLeft + enemy.offsetWidth;
          if (kils < 400) {
            enemy.remove();
            playerDie(kils);
            clearInterval(timerId);
            createEnemy();
          }
        }, 100);
        enemy.dataset.timer = timerId;
        document.body.append(enemy);
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
        lifesBlock.append(document.createElement("span"));

      // Создания элемента счётчика убийств
      const killCounterBlock = document.createElement("div");
      killCounterBlock.className = "killCounterBlock";

      const killCounter = document.createElement("span");

      // Счётчик убийств
      function killcounter(kill) {
        killCounter.textContent = `KILLS - ${kill < 10 ? "0" + kill : kill}`;
      }

      // Начальное колличество жизней
      let lifes = 3;

      // Реализация смерти игрока
      function playerDie(kill) {
        --lifes;

        if (kill < 400) {
          const lifesBlock = document.querySelector("#lifes");
          const life = lifesBlock.querySelector("span");
          life.remove();
          player.className = "boom";

          setTimeout(() => {
            player.className = "skin_" + (clickClass === 1 ? "1" : "2");
          }, 1000);

          endGame(lifes);
        }
      }

      function endGame(lifes) {
        if (lifes === 0) {
          setTimeout(() => {
            alert("END-GAME");
            location.reload();
          }, 100);
        }
      }

      killCounterBlock.append(killCounter);
      document.body.append(killCounterBlock);
      document.body.append(lifesBlock);
      document.body.append(player);
      playersBlock.remove();
      textBlock.remove();
    });
  }
});
document.body.prepend(startGame);
