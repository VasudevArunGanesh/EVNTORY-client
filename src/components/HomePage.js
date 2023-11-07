import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage(){
    return  <div>
        <p>this is the homepage</p>
        <Link to={"/"}><button>create event</button></Link>
    </div>

}