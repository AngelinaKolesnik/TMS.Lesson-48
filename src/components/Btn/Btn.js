import React, { useState } from "react";

export const Btn = (props) => {
	return (
	  <>
		 <button onClick={props.onClick}>{props.title}</button>
	  </>
	);
 };
