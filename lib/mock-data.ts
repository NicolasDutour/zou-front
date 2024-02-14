export async function fetchVisits() {
  try {
    return [
      {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
    ]
  } catch (error) {
    console.error("Error fetching restaurants", error);
    throw new Error("Error fetching restaurants");
  }
}

export async function fetchClients() {
  try {
    return [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Bob", age: 35 },
    ];
  } catch (error) {
    console.error("Error fetching restaurants", error);
    throw new Error("Error fetching restaurants");
  }
}
