export const logInGoogle = async (social_id, name, token) => {
  const data = {
    social_id: social_id,
    name: name,
    social_network: "google",
    token: token,
  };
  const response = await fetch("/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const logInFacebook = async (social_id, name, token) => {
  const data = {
    social_id: social_id,
    name: name,
    social_network: "facebook",
    token: token,
  };
  const response = await fetch("/auth/facebook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getUserNumber = async () => {
  const response = await fetch("/users/number");
  return response.json();
};

export const getUsersArr = async () => {
  const token = localStorage.getItem("token");
  const social_network = localStorage.getItem("social_network");

  const response = await fetch(
    `/users?token=${token}&social_network=${social_network}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const deleteUsersFetch = async (selectedId) => {
  const token = localStorage.getItem("token");
  const social_network = localStorage.getItem("social_network");
  const myId = localStorage.getItem("social_id");

  const data = {
    social_id: selectedId,
    token: token,
    social_network: social_network,
  };
  const response = await fetch("/users", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  selectedId.map((item) => {
    if (item === myId) {
      localStorage.clear();
    }
    return item;
  });

  window.location.reload();
  return response.json();
};

export const blockUser = async (selectedId) => {
  const token = localStorage.getItem("token");
  const social_network = localStorage.getItem("social_network");
  const myId = localStorage.getItem("social_id");

  const data = {
    social_id: selectedId,
    token: token,
    social_network: social_network,
  };

  const response = await fetch("/users/block", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  selectedId.map((item) => {
    if (item === myId) {
      localStorage.clear();
    }
    return item;
  });

  window.location.reload();
  return response.json();
};

export const unblockUser = async (selectedId) => {
  const token = localStorage.getItem("token");
  const social_network = localStorage.getItem("social_network");

  const data = {
    social_id: selectedId,
    token: token,
    social_network: social_network,
  };

  const response = await fetch("/users/unblock", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  window.location.reload();
  return response.json();
};
