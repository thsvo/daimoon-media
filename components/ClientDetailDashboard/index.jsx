import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";

import SimpleGraph from "/components/SimpleGraph";
import Button from "/components/Button";
import ProgressBar from "/components/ProgressBar";
import PlaylistCard from "/components/PlaylistCard";
import RepostBar from "/components/RepostBar";

import { ClientCampaignSatisfaction } from "/components/ClientCampaignSatisfaction";

import ToolTipCustom from "/components/Tooltip";
import Explanation from "/public/icons/explanation.jsx";

import Spotify from "/public/icons/spotify";
import Soundcloud from "/public/icons/soundcloud";
import Youtube from "/public/icons/youtube";
import ArrowDown from "/public/icons/arrow_down";

import YT_Placeholder from "/public/images/yt-graph-placeholder.png";

import styles from "./clientDetailDashboard.module.scss";

const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

function nFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}

function nFormatterDigit(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const SoundcloudDashboard = ({ content }) => {
  const { analytics, client, order, track, channels } = content;
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.row}>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.item_image].join(" ")}
          >
            <Image
              alt={"art cover"}
              src={track.cover}
              layout={"fill"}
              priority
            />
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.item_long].join(" ")}
          >
            <div className={styles.item_content}>
              <div className={styles.campaignInfo}>
                <div className={styles.campaignDetails}>
                  <div className={styles.infoHeader}>
                    <Soundcloud color={"#f50"} />
                    <span>Service | Campaign ID {order.id}</span>
                  </div>
                  <h2>{track.name}</h2>
                  <h4>{track.artists}</h4>
                  <div className={styles.genres}>
                    <div
                      style={{ backgroundColor: "#f50" }}
                      className={styles.genre}
                    >
                      {track.genre}
                    </div>
                    {track.subgenre ? (
                      <div
                        style={{ backgroundColor: "#f50" }}
                        className={styles.genre}
                      >
                        {track.subgenre}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.orderDetails}>
                  <div className={styles.details}>
                    <div className={styles.column}>
                      <label>Name</label>
                      <span>{client.name}</span>
                    </div>
                    <div className={styles.column}>
                      <label>Updates will go to</label>
                      <span>{client.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 1 }} className={styles.item}>
            <div className={styles.item_orderDetails}>
              <div>
                <label className={styles.title}>Your campaign</label>
                <div className={styles.orderDetails}>
                  <div className={styles.column}>
                    <div>
                      <label>Expected Streams</label>
                      <value>{order.streams}</value>
                    </div>
                    <div>
                      <label>Expected Followers</label>
                      <value>{nFormatterDigit(order.followers)}</value>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="soundcloud"
                text={"Order more"}
                to={"/campaigns/overview?service=soundcloud"}
                discount={true}
              ></Button>
            </div>
          </motion.div>
        </div>        <div className={styles.row}>          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.campaignStatusCard].join(" ")}
            style={{
              boxShadow:
                analytics.reach.followers > order.followers &&
                `0px 0px 15px 5px #f50`,
            }}
          >
            <div className={styles.item_content}>
              <div>
                <label className={styles.title}>Campaign Status: Reach</label>
                <div className={styles.content}>
                  <div>
                    <h3>
                      {nFormatter(
                        Math.round(analytics.reach.followers / 1000) * 1000
                      )}
                    </h3>
                  </div>
                </div>

                <label className={styles.targetContainer}>
                  Reach goal:
                  <span>
                    {nFormatter(
                      Math.round(order.followers.replaceAll(".", "") / 1000) *
                        1000
                    )}
                  </span>
                </label>
                <small className={styles.updated_on}>
                  Updated today at {time}
                </small>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.experienceCard].join(" ")}
          >
            <div className={styles.item_content}>              <ClientCampaignSatisfaction
                data={{ client, order }}
                service="soundcloud"
              />
            </div>
          </motion.div>
        </div>        <div className={[styles.row, styles.metricsRow].join(" ")}>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
            style={{
              boxShadow:
                analytics.reach.followers > order.followers &&
                `0px 0px 15px 5px #f50`,
            }}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Accepted playlists</label>
                <div>
                  <h3>0</h3>
                </div>
              </div>

              <small className={styles.updated_on}>
                Updated today at {time}
              </small>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
            style={{
              boxShadow:
                analytics.reach.followers > order.followers &&
                `0px 0px 15px 5px #f50`,
            }}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Average listing</label>
                <div>
                  <h3>N/A</h3>
                </div>
              </div>

              <small className={styles.updated_on}>
                Updated today at {time}
              </small>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
            style={{
              boxShadow:
                analytics.reach.followers > order.followers &&
                `0px 0px 15px 5px #f50`,
            }}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Accepted playlist followers</label>
                <div>
                  <h3>0</h3>
                </div>
              </div>

              <small className={styles.updated_on}>
                Updated today at {time}
              </small>
            </div>
          </motion.div>
        </div>
      </div>
      <div className={styles.repostContainer}>
        {[]
          .concat(channels.followers, channels.streams)
          .map(({ url, tstamp, followers }, index) => (
            <RepostBar
              key={index}
              link={url}
              timestamp={tstamp}
              followers={nFormatter(followers)}
            />
          ))}
      </div>
    </div>
  );
};

export const SpotifyDashboard = ({ content }) => {
  const { analytics, client, order, playlists, track, replacement } = content;
  const [averagePosition, setAveragePosition] = useState({
    position: 0,
    onPlaylists: 0,
  });
  const [openReplacement, setOpenReplacement] = useState(false);

  let estimatedStreams = "";
  switch (order?.package) {
    case "Bedroom Artist - For Starters":
      estimatedStreams = "1,500 to 6,000";
      break;
    case "One-To-Watch Artist 🔥":
      estimatedStreams = "10,000 to 30,000";
      break;
    case "Club Artist - Most chosen💣":
      estimatedStreams = "20,000 to 70,000";
      break;
    case "Touring Artist":
      estimatedStreams = "40,000 to 100,000";
      break;
    case "Festival Artist - The heaviest we can do🤯":
      estimatedStreams = "70,000 to 120,000";
      break;
    default:
      estimatedStreams = order.streams;
      order.package = "Custom";
      break;

    // code block
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.row}>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.item_image].join(" ")}
          >
            <Image
              alt={"art cover"}
              src={track.cover}
              layout={"fill"}
              priority
            />
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.item_long].join(" ")}
          >
            <div className={styles.item_content}>
              <div className={styles.campaignInfo}>
                <div className={styles.campaignDetails}>
                  <div className={styles.infoHeader}>
                    <Spotify color={"#1ED760"} />
                    <span>Service | Campaign ID {order.id}</span>
                  </div>
                  <h2>{track.name}</h2>
                  <h4>{track.artists}</h4>
                  <div className={styles.genres}>
                    <div className={styles.genre}>{track.genre}</div>
                    {track.subgenre ? (
                      <div className={styles.genre}>{track.subgenre}</div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.orderDetails}>
                  {analytics.streams.pitched != 0 && playlists.length == 0 ? (
                    <span className={styles.progress}>
                      Pitching your track
                      <ToolTipCustom
                        label={""}
                        text={
                          "We have pitched your track and are currently awaiting curator responses"
                        }
                      >
                        <Explanation />
                      </ToolTipCustom>
                    </span>
                  ) : (
                    <span className={styles.progress}>
                      Placing Progress:{" "}
                      <b>
                        {content.order.hidden == 0
                          ? Math.round(analytics.playlists.progress) + "%"
                          : "100%"}
                      </b>
                      {/* <ToolTipCustom label={''} text={''}>
                      <Explanation />
                    </ToolTipCustom> */}
                    </span>
                  )}

                  <div className={styles.details}>
                    <div className={styles.column}>
                      <label>Name</label>
                      <span>{client.name}</span>
                    </div>
                    <div className={styles.column}>
                      <label>Updates will go to</label>
                      <span>{client.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 1 }} className={styles.item}>
            <div className={styles.item_orderDetails}>
              <div>
                <label className={styles.title}>Your campaign</label>
                <div className={styles.orderDetails}>
                  <div className={styles.column}>
                    <div>
                      <label>Order date</label>
                      <value>{order.date}</value>
                    </div>

                    <div>
                      <label>Your package</label>
                      <value>{order.package}</value>
                    </div>
                    <div>
                      <label>Campaign ID</label>
                      <value>{order.id}</value>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div>
                      <label>Streams</label>
                      <value>{estimatedStreams}</value>
                    </div>
                    <div>
                      <label>Followers</label>
                      <value>{nFormatterDigit(order.followers)}</value>
                    </div>
                  </div>
                </div>
              </div>
              {openReplacement == true ? (
                <Formik
                  initialValues={{
                    trackUrl: "",
                  }}
                  onSubmit={async (values) => {
                    await fetch(
                      "https://oms.daimoon.media/api/v1/spotify/replacement",
                      {
                        method: "POST",
                        headers: {
                          Authorization:
                            "Bearer " + process.env.NEXT_PUBLIC_OMS_BEARER,
                        },
                        body: JSON.stringify({
                          fields: {
                            id: order.oms_id,
                            track_url: values.trackUrl,
                          },
                        }),
                      }
                    );

                    setOpenReplacement(false);
                    router.reload();
                  }}
                >
                  <Form className="flex">
                    <Field
                      className="bg-[#363636] w-[284px] h-[40px] rounded-l-[10px] pl-[21px] border-none text-white"
                      id="trackUrl"
                      name="trackUrl"
                      placeholder="Track URL"
                    />

                    <button
                      type="submit"
                      className="bg-[#1ed760] text-[#fdfdfd] border-none h-[40px] rounded-r-[6px] text-[16px] hover:pointer"
                    >
                      Save
                    </button>
                  </Form>
                </Formik>
              ) : replacement?.required == true ? (
                <>
                  <div
                    className="w-full bg-[#f50] rounded-[15px] h-[48px] py-[15px] px-[20px] font-[500] hover:scale-105 cursor-pointer"
                    onClick={() => setOpenReplacement(true)}
                  >
                    <span>Click to submit replacement track</span>
                  </div>
                </>
              ) : (
                <Button
                  type="spotify"
                  text={"Order more"}
                  to={"/campaigns/overview?service=spotify"}
                  discount={true}
                ></Button>
              )}
            </div>
          </motion.div>        </div>

        <div className={styles.row}>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.campaignStatusCard].join(" ")}
            style={{
              boxShadow:
                playlists.length > analytics.playlists.requirement &&
                order.followers &&
                analytics.followers.accepted > order.followers &&
                `0px 0px 15px 5px #1ed760`,
            }}
          >
            <div className={styles.item_content}>
              <div>
                <label className={styles.title}>Campaign Status: Reach</label>
                <div className={styles.progressContainer}>
                  <div className={styles.progressRow}>
                    <div className={styles.label}>
                      <label>Playlists</label> <br/>
                      <span className="font-normal text-[13px] leading-[17px] text-[#5f5f5f]">Est. {analytics.playlists.requirement}</span>
                    </div>
                    <ProgressBar
                      bgcolor={"#1ED760"}
                      completed={
                        content.order.hidden == 0
                          ? analytics.playlists.accepted
                          : 100
                      }
                      goal={
                        content.order.hidden == 0
                          ? analytics.playlists.requirement
                          : 100
                      }
                    />
                  </div>
                  <br/>
                  <div
                    className={[
                      styles.progressRow,
                      styles.progressRow_modified,
                    ].join(" ")}
                  >
                    <div className={styles.label}>
                      <label>Reach campaign details</label> <br/>
                      <span className="font-normal text-[13px] leading-[17px] text-[#5f5f5f]">Goal: {nFormatter(order.followers)}</span>
                    </div>

                    {analytics.streams.total == analytics.streams.pitched &&
                    playlists.length == 0 ? (
                      <ProgressBar
                        bgcolor={"#1ED760"}
                        completed={analytics.followers.accepted}
                        goal={order.followers}
                        pitched={order.followers}
                        unpitched={0}
                        type={2}
                      />
                    ) : (
                      <ProgressBar
                        bgcolor={"#1ED760"}
                        completed={
                          content.order.hidden == 0
                            ? analytics.playlists.accepted
                            : 100
                        }
                        goal={
                          content.order.hidden == 0
                            ? analytics.playlists.requirement
                            : 100
                        }
                        pitched={
                          analytics.followers.pitched
                            ? analytics.followers.pitched
                            : 0
                        }
                        unpitched={
                          order.followers -
                          analytics.followers.pitched -
                          analytics.followers.accepted
                        }
                        type={2}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.experienceCard].join(" ")}
          >
            <div className={styles.item_content}>
              <ClientCampaignSatisfaction
                data={{ client, order }}
                service="spotify"
              />
            </div>
          </motion.div>
        </div>
        <div className={[styles.row, styles.metricsRow].join(" ")}><motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
            style={{
              boxShadow:
                playlists.length > analytics.playlists.requirement &&
                `0px 0px 15px 5px #1ed760`,
            }}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Accepted playlists</label>
                <div>
                  <h3>{analytics.playlists.accepted}</h3>
                  {/* <small>
                    {content.order.hidden == 0 &&
                      "est. total " + analytics.playlists.requirement}
                  </small> */}
                </div>
              </div>

              {/* <small className={styles.updated_on}>
                Updated today at {time}
              </small> */}
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
            style={{
              boxShadow:
                playlists.length > analytics.playlists.requirement &&
                `0px 0px 15px 5px #1ed760`,
            }}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Average listing</label>

                {averagePosition.onPlaylists == 0 ? (
                  <>
                    <div>
                      <h3>N/A</h3>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3>
                      {Math.floor(
                        averagePosition.position / averagePosition.onPlaylists
                      )}
                    </h3>
                    <small>
                      Out of {averagePosition.onPlaylists} playlists
                    </small>
                  </div>
                )}
              </div>

              {/* <small className={styles.updated_on}>
                Updated today at {time}
              </small> */}
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
            style={{
              boxShadow:
                analytics.followers.accepted > order.followers &&
                `0px 0px 15px 5px #1ed760`,
            }}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Accepted playlist followers</label>
                <div>
                  <h3>
                    {nFormatter(
                      Math.round(analytics.followers.accepted / 1000) * 1000
                    )}
                  </h3>
                  <span>
                    {analytics.followers.accepted > order.followers &&
                      "/" + nFormatter(order.followers)}
                  </span>
                </div>
              </div>

              {/* <small className={styles.updated_on}>
                Updated today at {time}
              </small> */}
            </div>
          </motion.div>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <section className={styles.playlists}>
          <div className={styles.sectionTitle}>
            <label>
              Rejected
              <span className={styles.itemNumber}>
                ({analytics.curators && analytics.curators.rejected})
              </span>
            </label>
          </div>
        </section>
      </div>
      <div className={styles.additionalInfo}>
        {/* <section className={styles.notes}>
          <div className={styles.sectionTitle}>
            <label>Notes</label>
          </div>
        </section> */}

        <section className={styles.playlists}>
          <div className={styles.sectionTitle}>
            <label>
              Playlists
              <span className={styles.itemNumber}>
                ({analytics.playlists.total})
              </span>
            </label>

            <ArrowDown />
          </div>
          <div className={styles.sectionBody}>
            {playlists.length == 0 ||
              (analytics.streams.pitched >= 0 && (
                <PlaylistCard playlist placeholder={true} />
              ))}
            {playlists.map((playlist, index) => (
              <PlaylistCard
                playlist={playlist}
                track_id={track.track_id}
                key={index}
                setAveragePosition={setAveragePosition}
                averagePosition={averagePosition}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export const YoutubeDashboard = ({ content }) => {
  const { live, client, order, track } = content;

  const status = order.campaign_status;

  const StatusBox = () => {
    let bg = "";
    let color = "";

    switch (status) {
      case "Accepted":
        color = "rgba(30, 215, 96, 0.1)";
        bg = "#1ED760";
        break;
      case "Denied":
        color = "rgba(238, 0, 0, 0.1)";
        bg = "#FF0000";
        break;
      case "Pending":
        color = "rgba(255, 85, 0, 0.1)";
        bg = "#f50";
        break;
      case "Accepted":
        color = "rgba(30, 215, 96, 0.1)";
        bg = "#1ED760";
        break;
    }

    const style = {
      backgroundColor: color,
      border: `1px solid ${bg}`,
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: "10px",
      fontSize: "14px",
      fontWeight: "700",
      marginBottom: "0",
    };

    return <div style={style}>{status}</div>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.row}>
          <motion.div
            className={[styles.item].join(" ")}
            style={{ backgroundColor: "transparent" }}
          >
            <div className={styles.item_content} style={{ padding: "15px" }}>
              <div className={styles.campaignInfo}>
                <div className={styles.campaignDetails}>
                  <div className={styles.infoHeader}>
                    <Youtube color={"#e00"} />
                    <span>Service | Campaign ID {order.id}</span>
                  </div>
                  <h2>
                    {track.name.length > 19
                      ? track.name.substring(0, 19 - 3) + " ..."
                      : track.name.substring(0, 19)}
                  </h2>
                  <h4>{track.artists}</h4>
                  <div className={styles.genres}>
                    <div
                      style={{ backgroundColor: "#e00" }}
                      className={styles.genre}
                    >
                      {track.genre}
                    </div>
                    {track.subgenre ? (
                      <div
                        style={{ backgroundColor: "#e00" }}
                        className={styles.genre}
                      >
                        {track.subgenre}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    marginTop: "15px",
                  }}
                >
                  <Image alt={"art cover"} src={track.cover} fill priority />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 1 }} className={styles.item}>
            <div className={styles.item_orderDetails}>
              <div>
                <div style={{ marginTop: "0" }} className={styles.orderDetails}>
                  <div className={styles.column}>
                    <div>
                      <label>Google Ads status</label>
                      <StatusBox />
                    </div>
                  </div>
                </div>
                <label className={styles.title}>Personal info</label>
                <div style={{ marginTop: "0" }} className={styles.orderDetails}>
                  <div className={styles.column}>
                    <div>
                      <label>Order date</label>
                      <value>{nFormatterDigit(order.views)}</value>
                    </div>
                    <div>
                      <label>Name</label>
                      <value>{client.name}</value>
                    </div>
                    <div>
                      <label>Updates will go to</label>
                      <value>{client.email}</value>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 1 }} className={styles.item}>
            <div className={styles.item_orderDetails}>
              <div>
                <label className={styles.title}>Your campaign</label>
                <div className={styles.orderDetails}>
                  <div className={styles.column}>
                    <div>
                      <label>Expected Views</label>
                      <value>{nFormatterDigit(order.views)}</value>
                    </div>
                    <div>
                      <label>Selected Regions</label>
                      {order.regions.length == 0 ? (
                        <span>N.A.</span>
                      ) : (
                        order.regions.map((item, index, arr) => {
                          return (
                            <span key={index}>
                              {arr.length - 1 != index
                                ? item.text + ` - `
                                : item.text}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="youtube"
                text={"Order more"}
                to={"/campaigns/overview?service=youtube"}
                discount={true}
              ></Button>
            </div>
          </motion.div>
        </div>        <div className={styles.row}>          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.campaignStatusCard].join(" ")}
            style={{
              boxShadow:
                live.views - order.starting_views > order.views &&
                `0px 0px 15px 5px #e00`,
            }}
          >
            <div className={styles.item_content}>
              <div>
                <label className={styles.title}>Campaign Status: Views</label>
                <div className={styles.content}>
                  <label>Viewers reached</label>
                  <div>
                    <h3>
                      {nFormatter(
                        Math.round((live.views - order.starting_views) / 1000) *
                          1000
                      )}
                    </h3>
                    <span style={{ color: "#e00" }}>
                      /{nFormatter(order.views)}
                    </span>
                  </div>
                </div>
                <ProgressBar
                  bgcolor={"#e00"}
                  completed={live.views}
                  goal={order.views}
                  type={3}
                />
                <small className={styles.updated_on}>
                  Updated today at {time}
                </small>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item, styles.experienceCard].join(" ")}
          ><div className={styles.item_content}>
              <ClientCampaignSatisfaction
                data={{ client, order }}
                service="youtube"
              />
            </div></motion.div>
        </div>
        <div className={[styles.row, styles.metricsRow].join(" ")}>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Accepted playlists</label>
                <div>
                  <h3>0</h3>
                </div>
              </div>

              <small className={styles.updated_on}>
                Updated today at {time}
              </small>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Average listing</label>
                <div>
                  <h3>N/A</h3>
                </div>
              </div>

              <small className={styles.updated_on}>
                Updated today at {time}
              </small>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            className={[styles.item].join(" ")}
          >
            <div className={styles.item_content_center}>
              <div className={styles.content}>
                <label>Accepted playlist followers</label>
                <div>
                  <h3>0</h3>
                </div>
              </div>

              <small className={styles.updated_on}>
                Updated today at {time}
              </small>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
