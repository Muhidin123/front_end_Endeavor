import React, { useContext } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '../components';
import articles from '../constants/articles';
import Tabs from '../components/Tabs';
import { Context } from '../../../App';
const { width } = Dimensions.get('screen');

function Home() {
  const item = useContext(Context);
  const renderArticles = () => {
    return (
      <>
        <Tabs />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex>
            {/* Test the home page horizontal only  */}
            {item.map((trip) => {
              return <Card item={trip} horizontal />;
            })}

            {/* <Card item={articles[6]} horizontal />
            <Card item={articles[6]} full />
            <Card item={articles[6]} full />
            <Card item={articles[0]} horizontal />
            <Card item={articles[0]} horizontal />
            <Card item={articles[0]} horizontal />
            <Card item={articles[0]} horizontal />
            <Card item={articles[0]} horizontal />
            <Card item={articles[0]} horizontal />
            <Card item={articles[0]} horizontal /> */}
            {/* <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[3]} horizontal />
          <Card item={articles[3]} horizontal />
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
          <Card item={articles[4]} full />
          <Card item={articles[4]} full />
          <Card item={articles[4]} full />
          <Card item={articles[4]} full /> */}
          </Block>
        </ScrollView>
      </>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
  },
});

export default Home;
