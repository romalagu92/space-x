import React from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { generateSearchParams, useQuery, setData, getData } from "../../utilities/helpers";
import { getSpaceXData } from "../../api";
import Card, { SpaceXCard } from "../../components/card/card";
import Button from "../../components/button/button";
import "./landing.scss";
import { LIMIT, FILTER_LABELS } from "../../constants/app";

export const Loading = () => {
    console.log("Loading");
    return (
        <div className="loading">
            <span>Loading ... </span>
        </div>
    );
};

// 1. reset 2. loader 3. selected filters 4. ID
const Landing = () => {
    const [spaceXData, setSpaceXData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    let query = useQuery();
    let history = useHistory();

    // API Call
    const fetchSpaceXData = async (url) => {
        try {
            setLoading(true);
            let response = await getSpaceXData(url);
            // set state
            if (response && response.data && response.data.length) setSpaceXData(response.data);
            setLoading(false);
        } catch (e) {
            console.error("Error ", e);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        history.location.search && fetchSpaceXData(history.location.search);
    }, [history.location.search]);

    // Filter Map
    // Cache or React.useMemo
    if (!getData("filterMap") && spaceXData.length) {
        setData(
            "filterMap",
            spaceXData.length && {
                [FILTER_LABELS.Launch_Year]: _.uniqBy(spaceXData, "launch_year"),
                [FILTER_LABELS.Successful_Launch]: [true, false],
                [FILTER_LABELS.Successful_Landing]: [true, false],
            }
        );
    }

    // Add query parameters to browser
    const addQueryParams = ({ label, value }) => {
        generateSearchParams({
            limit: LIMIT,
            launch_success: label === FILTER_LABELS.Successful_Launch ? `${value}` : undefined,
            land_success: label === FILTER_LABELS.Successful_Landing ? `${value}` : undefined,
            launch_year: label === FILTER_LABELS.Launch_Year ? value.launch_year : undefined,
            history,
        });
    };

    return spaceXData.length ? (
        <div className="container">
            {/* Loader */}
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Card className="filter">
                        {getData("filterMap") &&
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
                                                        key={`${value.launch_year || `${label}${value}`}${i}`}
                                                        onClick={() => {
                                                            addQueryParams({
                                                                label,
                                                                value,
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
                    <div className="space-x-data">
                        {/* SpaceX Card */}
                        {spaceXData.map((spaceXData, index) => {
                            return (
                                <Card key={`${spaceXData.mission_name}__${index}`}>
                                    <SpaceXCard index={index + 1} {...spaceXData} />
                                </Card>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    ) : null;
};

export default Landing;

/* limit: value.limit, */
