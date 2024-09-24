export default (results) => {
  const arrival = results[0].arrival;
  const now = new Date();
  const timeDiff = now.getTime() - arrival.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  const time = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  const departure = now;
  let cost = 0;
  let info = [];

  if (hours <= 3) {
    cost = 80;
    info = [["Base cost", "80"]];
  } else if (hours <= 8) {
    cost = 80 + (hours - 3) * 50;
    info = [
      ["Base cost", "80"],
      ["3+ hour cost", `${hours - 3} * 50`],
    ];
  } else {
    cost = 80 + 5 * 50 + (hours - 8) * 100;
    info = [
      ["Base cost", "80"],
      ["3+ hour cost", "5 * 50"],
      ["8+ hour cost", `${hours - 8} * 100`],
    ];
  }
  //overnight logic
  /*let nights = 0;
  let startDate = new Date(arrival);
  while (startDate < now) {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(5, 0, 0, 0); // 5am day shesh

    if (arrival.getHours() < 5 && now.getHours() >= 5) {
      let timeDiff = endDate.getTime() - arrival.getTime();
      let hours = Math.floor(timeDiff / (1000 * 60 * 60));

      if (hours > 5) {
        nights++;
      }
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  cost += nights * 500; */

  let days = Math.floor(
    (now.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24)
  );
  cost += days * 500;
  days > 0 ? info.push(["Night penalty", `${days} * 500`]) : info;
  return [time, departure, info, cost];
};

/* first 3 hours = 80
next 5 hr per hour = 50
then per hr = 100
between 12 am and 5 am, if a car is parked for the whole time, overnight charge of 500 will be added 
*/
