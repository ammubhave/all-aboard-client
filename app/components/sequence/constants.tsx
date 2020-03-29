const CARD_TO_CHAR = {
    'SA': "🂡",
    "S2": "🂢",
    "S3": "🂣",
    "S4": "🂤",
    "S5": "🂥",
    "S6": "🂦",
    "S7": "🂧",
    "S8": "🂨",
    "S9": "🂩",
    "ST": "🂪",
    "SJ": "🂫",
    "SQ": "🂭",
    "SK": "🂮",
    'HA': "🂱",
    "H2": "🂲",
    "H3": "🂳",
    "H4": "🂴",
    "H5": "🂵",
    "H6": "🂶",
    "H7": "🂷",
    "H8": "🂸",
    "H9": "🂹",
    "HT": "🂺",
    "HJ": "🂻",
    "HQ": "🂽",
    "HK": "🂾",
    'DA': "🃁",
    "D2": "🃂",
    "D3": "🃃",
    "D4": "🃄",
    "D5": "🃅",
    "D6": "🃆",
    "D7": "🃇",
    "D8": "🃈",
    "D9": "🃉",
    "DT": "🃊",
    "DJ": "🃋",
    "DQ": "🃍",
    "DK": "🃎",
    'CA': "🃑",
    "C2": "🃒",
    "C3": "🃓",
    "C4": "🃔",
    "C5": "🃕",
    "C6": "🃖",
    "C7": "🃗",
    "C8": "🃘",
    "C9": "🃙",
    "CT": "🃚",
    "CJ": "🃛",
    "CQ": "🃝",
    "CK": "🃞",
    "XX": "🂠",
};

export function getCardColor(card: string) {
    let suit = card[0];
    if (suit == "X") {
        return "purple";
    } else if (suit == "H" || suit == "D") {
        return "red";
    } else {
        return "black";
    }
}

export function getCardChar(card: string) {
    return CARD_TO_CHAR[card];
}
