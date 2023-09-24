import React, { useEffect, useState } from 'react';
import { Flex, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import CustomSlideFade from 'components/common/CustomSlideFade';
import StringConstants from 'constants/strings';
import { featuresDone, featuresTodo } from './const';

const FeatureList = () => {
  const done = featuresDone;
  const todo = featuresTodo;

  const [showList, setShowList] = useState(false);
  const didListTransition = localStorage.getItem('didListTransition') === 'true';

  useEffect(() => {
    if (!didListTransition) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showList) {
      localStorage.setItem('didListTransition', 'true');
    }
  }, [showList]);

  return (
    <VStack
      spacing={4}
      align="start"
    >
      <CustomSlideFade disabled={didListTransition} in={showList}>
        <Text as="b">{StringConstants.FEATURES}</Text>
      </CustomSlideFade>
      <UnorderedList spacing={2}>
        <CustomSlideFade disabled={didListTransition} in={showList}>
          <Flex mb={2}><Text as="u">{StringConstants.DONE}</Text></Flex>
        </CustomSlideFade>
        <UnorderedList spacing={2}>
          {done.map((item, index) => (
            <CustomSlideFade disabled={didListTransition} key={index} in={showList} delay={0.2 * (index + 1)}>
              <ListItem key={item}>{item}</ListItem>
            </CustomSlideFade>
          ))}
        </UnorderedList>
        <CustomSlideFade disabled={didListTransition} in={showList}>
          <Flex mb={2}><Text as="u"><Text as="u">{StringConstants.TODO}</Text></Text></Flex>
        </CustomSlideFade>
        <UnorderedList spacing={2}>
          {todo.map((item, index) => (
            <CustomSlideFade disabled={didListTransition} key={index} in={showList} delay={0.2 * (index + 1)}>
              <ListItem key={item}>{item}</ListItem>
            </CustomSlideFade>
          ))}
        </UnorderedList>
      </UnorderedList>
    </VStack>
  );
};

export default FeatureList;
