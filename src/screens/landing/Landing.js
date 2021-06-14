import React from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { generateSearchParams, useQuery, setData, getData } from "../../utilities/helpers";
import { getSpaceXData } from "../../api";
import Card, { SpaceXCard } from "../../components/card/card";
import Button from "../../components/button/button";
import "./landing.scss";

const Landing = () => {
    const [spaceXData, setSpaceXData] = React.useState([]);
    let query = useQuery();
    let history = useHistory();

    // API Call
    const fetchSpaceXData = async (url) => {
        try {
            const response = await getSpaceXData(url);
            if (response && response.data && response.data.length) {
                // set state
                setSpaceXData(response.data);
            }
        } catch (e) {
            console.error("Error ", e);
        }
    };

    React.useEffect(() => {
        fetchSpaceXData(history.location.search);
    }, [history.location.search]);

    // Filter Map
    // Cache or React.useMemo
    if (!getData("filterMap") && spaceXData.length) {
        setData(
            "filterMap",
            spaceXData.length && {
                "Launch Year": _.uniqBy(spaceXData, "launch_year"),
                "Successful Launch": [true, false],
                "Successful Landing": [true, false],
            }
        );
    }

    // Add query parameters to browser
    const addQueryParams = ({ limit, launch_success, land_success, launch_year, label }) => {
        generateSearchParams({
            limit: limit,
            launch_success:
                typeof launch_success !== "undefined" && label === "Successful Launch"
                    ? `${launch_success}`
                    : undefined,
            land_success:
                typeof land_success !== "undefined" && label === "Successful Landing" ? `${land_success}` : undefined,
            launch_year: label === "Launch Year" ? `${launch_year}` : undefined,
            history,
        });
    };

    return spaceXData.length ? (
        <div className="container">
            {/* Filter */}
            <Card className="filter">
                {!!getData("filterMap") &&
                    Object.entries(getData("filterMap")).map(([label, values], index) => {
                        return (
                            <div className="filter__blocks" key={`${label}${index}`}>
                                <div className="filter__labels">
                                    {label}
                                    <hr />
                                </div>
                                <div className="filter__buttons">
                                    {values.map((value, i) => {
                                        return (
                                            <Button
                                                key={`${value.launch_year || `${value}`}${i}`}
                                                onClick={() => {
                                                    addQueryParams({
                                                        limit: value.limit,
                                                        launch_success: value,
                                                        land_success: value,
                                                        launch_year: value.launch_year,
                                                        label,
                                                    });
                                                }}
                                                text={value.launch_year || `${value}`}
                                                color="green"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
            </Card>
            {/* SpaceX Card */}
            <div className="space-x-data">
                {spaceXData.map((spaceXData, index) => {
                    return (
                        <Card key={`${spaceXData.mission_name}__${index}`}>
                            <SpaceXCard index={index + 1} {...spaceXData} />
                        </Card>
                    );
                })}
            </div>
        </div>
    ) : null;
};

export default Landing;
