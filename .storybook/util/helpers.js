export const storyFactory = options => {
  const { title, component, args, description } = options;
  return {
    title,
    component,
    // component-level default args to the component being tested
    // you could add other app-level options here, too!
    args: {
      dark: false,
      ...args,
    },
    parameters: {
      docs: {
        description: {
          component: description,
        },
      },
    },
  };
};
