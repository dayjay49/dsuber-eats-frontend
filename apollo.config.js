module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "dsuber-eats-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};

