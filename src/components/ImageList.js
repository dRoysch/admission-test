import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList({
  list,
  handleChange = () => null,
  valueSelected = ''
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {list &&
          list.map((item) => (
            <ImageListItem key={item}>
              <img
                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                onClick={() => handleChange({
                  target: {
                    name: 'image',
                    value: item
                  }
                })}
                style={valueSelected === item ? {
                  border: "3px solid red" 
                } : {}}
              />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
}
