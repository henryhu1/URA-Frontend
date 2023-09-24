export const initialData: NodeType = {
  name: "Input Folder",
  type: "directory",
  children: [
    {
      name: "Label 1",
      type: "directory",
      children: [
        {
          name: "img 1_1",
          type: "file",
        },
        {
          name: "img 1_2",
          type: "file",
        },
        {
          name: "...",
          type: "continue",
        },
      ],
    },
    {
      name: "Label 2",
      type: "directory",
      children: [
        {
          name: "img 2_1",
          type: "file",
        },
        {
          name: "img 2_2",
          type: "file",
        },
        {
          name: "...",
          type: "continue",
        },
      ],
    },
    {
      name: "...",
      type: "continue",
    },
    {
      name: "Label n",
      type: "directory",
      children: [
        {
          name: "img n_1",
          type: "file",
        },
        {
          name: "img n_2",
          type: "file",
        },
        {
          name: "...",
          type: "continue",
        },
      ],
    },
  ],
};

export type NodeType = {
  name: string,
  type: "directory" | "file" | "continue",
  children?: NodeType[],
};
