
      const elementArray = document.querySelectorAll(".card");
      setInterval(() => {
        const date = new Date();
        elementArray[0].innerHTML =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        elementArray[1].innerHTML =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        elementArray[2].innerHTML =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      }, 1000);
    