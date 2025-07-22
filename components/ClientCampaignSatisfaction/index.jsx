import { useState } from "react";
import { FaRegStar } from "react-icons/fa";

export const ClientCampaignSatisfaction = ({
  data: { client, order },
  service,
}) => {
  const [rating, setRating] = useState(-1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState({ status: false, message: "" });

  const { email, name } = client;
  const { date, id, oms_id } = order;

  const onSubmit = async () => {
    setLoading(true);
    const data = {
      rating: rating + 1,
      comment,
      email,
      name,
      date,
      id,
      oms_id,
      service,
    };

    const result = await fetch("/api/rating/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (result.ok) {
      setSubmitted({ status: true, message: "Submitted successfully" });
      return;
    }

    !result.ok && setSubmitted({ status: true, message: "Failed to submit" });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>      <style>
        {`
          textarea::placeholder {
            font-size: 9px;
            font-family: "Inter";
            font-weight: 400;
            color: #C3C3C3;
            width: 36px;
            height: 11px;
          }
          
          @keyframes light {
            0% {
              background-position: -600px;
            }
            15% {
              background-position: 0px;
            }
            100% {
              background-position: 0px;
            }
          }
        `}
      </style><div
        style={{
          width: "100%",
          background: "rgb(32, 32, 32)",
          borderRadius: 20,
          // padding: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 15,
          height: "100%",
          boxSizing: "border-box",
        }}
      >

        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
          <h4
            style={{
              margin: 0,
              color: "white",
              fontSize: 16,
              fontWeight: 600,
              textAlign: "left",
              lineHeight: 1.3,
              width: "100%",
            }}
          >
            How&apos;s your experience so far?
          </h4>
          
          <div style={{ display: "flex", gap: 1, justifyContent: "flex-start", width: "100%" }}>
            {new Array(5).fill(null).map((_, i) => (
              <Star
                key={i}
                selected={i <= rating}
                onSelect={() => setRating(i)}
              />
            ))}
          </div>
        </div><textarea
          style={{
            width: "100%",
            minHeight: 100,
            maxHeight: 120,
            background: "#fff",
            color: "#333",
            borderRadius: 10,
            padding: 15,
            marginBottom: 0,
            border: "1px solid #e0e0e0",
            fontSize: 14,
            fontWeight: 400,
            resize: "none",
            fontFamily: "Inter",
            boxSizing: "border-box",
            outline: "none",
          }}
          placeholder="Optional"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        ></textarea>          <button
          style={{
            width: "100%",
            maxWidth: "none",
            gap:"18px",
            height: "52px",
            padding: "15px 20px 15px 20px",
            fontWeight: "700",
            borderRadius: "15px",
            border: "none",
            display: "inline-flex",
            textTransform: "capitalize",
            justifyContent: "flex-start",
            alignItems: "center",
            transition: "all 0.2s ease-in-out",
            cursor: "pointer",
            position: "relative",
            background: "linear-gradient(135deg, #1db954 0%, #1db954 40%, #ffffff 50%, #1db954 60%, #1db954 100%)",
            backgroundRepeat: "repeat",
            backgroundPosition: "0px",
            backgroundSize: "300%",
            animation: "light 6s infinite 1s",
            color: "#fdfdfd",
            fontSize: "14px",
            opacity: loading ? 0.6 : 1,
            boxSizing: "border-box",
          }}
          onClick={() => onSubmit()}
          disabled={loading}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.transform = "scale(1.05)";
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.transform = "scale(1)";
            }
          }}
        >          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "10px" }}
          >
            <path 
              d="M2 21L23 12L2 3V10L17 12L2 14V21Z" 
              fill="white"
            />
          </svg>
          Submit
        </button>
      </div>
    </>
  );
};

const Star = ({ selected = false, onSelect }) => {
  return (
    <FaRegStar
      onClick={onSelect}
      color={selected ? "#ffd700" : "#666666"}
      size={28}
      style={{ cursor: "pointer", transition: "color 0.15s" }}
    />
  );
};
