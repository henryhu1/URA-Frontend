import React, { useState } from "react";
import { Box, Text, VStack, Collapse } from "@chakra-ui/react";
import { initialData, NodeType } from "./const";
import theme from "theme";

const TreeNode = ({ node, level }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack align="center" spacing={1}>
      <Box pl={level * 20}>
        {(() => {
          switch(node.type) {
            case "directory":
              return (
                <Text fontFamily={theme.fonts.mono} onClick={handleClick} cursor="pointer">
                  {`${isOpen ? "[-]" : "[+] "} 📁 ${node.name}`}
                </Text>
              );
            case "file":
              return <Text fontFamily={theme.fonts.mono}>{`📄 ${node.name}`}</Text>;
            default:
              return <Text fontFamily={theme.fonts.mono}>{node.name}</Text>;
          }
        })()}
      </Box>
      <Collapse in={isOpen}>
        {node.children?.map((child, index) => (
          <TreeNode key={index} node={child} level={level + 1} />
        ))}
      </Collapse>
    </VStack>
  );
};

type TreeNodeProps = {
  node: NodeType,
  level: number,
};

const DirectoryTree = () => {
  return <TreeNode node={initialData} level={0} />;
};

export default DirectoryTree;
