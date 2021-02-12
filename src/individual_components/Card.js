import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Block, Text, theme } from "galio-framework";
import * as Font from "expo-font";

let customFonts = {
  "montserrat-regular": require("../../assets/font/Montserrat-Regular.ttf"),
  "montserrat-bold": require("../../assets/font/Montserrat-Bold.ttf"),
};

Font.loadAsync(customFonts);
import { nowTheme } from "../constants";

function Card(props) {
  const {
    navigation,
    item,
    horizontal,
    full,
    style,
    ctaColor,
    imageStyle,
    ctaRight,
    titleStyle,
  } = props;

  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const titleStyles = [styles.cardTitle, titleStyle];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];
  return (
    <>
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Trip", { trip: item })}
        >
          <Block flex style={imgContainer}>
            <Image
              resizeMode='cover'
              source={
                item.image
                  ? {
                      uri: item.image,
                    }
                  : require("../../assets/imgs/picture-not-available.jpg")
              }
              style={imageStyles}
            />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => console.log("Pressed title or something in there")}
        >
          <Block flex space='between' style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: "montserrat-regular" }}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title || item.description}
              </Text>
              {/* {CHECK FOR ITEN SUBTITLE TO DISPLAY ON THE CARD} */}
              {item.subtitle ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: "montserrat-regular" }}
                    size={32}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {item.id}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
              {/* {item.description ? (
                <Block flex center>
                  <Text
                    style={{
                      fontFamily: "montserrat-regular",
                      textAlign: "center",
                      padding: 15,
                    }}
                    size={14}
                    color={"#9A9A9A"}
                  >
                    {item.description}
                  </Text>
                </Block>
              ) : (
                <Block />
              )} */}
              {/* {BODY OF THE CARD JUST UNDER THE DESCRIPTION} */}
              {item.note ? (
                <Block flex left>
                  <Text size={12} color={nowTheme.COLORS.TEXT}>
                    {item.note}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
            {/* ADD A LOCATION NAME AND MARKER INSTEAD OF THE VIEW ARTICLE/CHANGE THE NAME OF VIEW ARTICLE  */}
            <Block right={true}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                {/* NAME OF LOCATION AND MARKER */}
                {item["destination_name"]}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    </>
  );
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 300,
    width: "auto",
  },
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: "montserrat-bold",
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default withNavigation(Card);
