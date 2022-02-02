import dayjs from "dayjs";
import "dayjs/locale/id";

export const formatTime = (time) => {
  return dayjs(time).locale("id").format("DD MMM, YYYY HH:mm");
};

export const documentStatus = ({
  workflow,
  status,
  signatory_status,
  role,
  is_approve,
}) => {
  let kata;
  let color;

  if (
    workflow === "selfSign" &&
    role === "signer" &&
    signatory_status === "in progress"
  ) {
    kata = status;
  } else {
    if (status === "completed") {
      kata = "completed";
      color = "green";
    }

    if (status === "rejected" && role === null) {
      kata = "rejected";
      color = "red";
    }

    if (
      status === "rejected" &&
      role === "signer" &&
      !is_approve &&
      signatory_status === "in progress"
    ) {
      kata = "unsigned (rejected)";
      color = "red";
    }

    if (
      status === "rejected" &&
      role === "reviewer" &&
      !is_approve &&
      signatory_status === "in progress"
    ) {
      kata = "unreviewed (rejected)";
      color = "red";
    }

    if (role === "reviewer" && signatory_status === "completed") {
      kata = "reviewed";
      color = "red";
    }

    if (
      role === "reviewer" &&
      signatory_status === "rejected" &&
      status === "rejected"
    ) {
      kata = "reviewed (rejected)";
      color = "red";
    }

    if (
      role === "signer" &&
      signatory_status === "rejected" &&
      status === "rejected"
    ) {
      kata = "signed (rejected)";
      color = "red";
    }

    if (role === "signer" && signatory_status === "completed") {
      kata = "signed";
      color = "green";
    }

    if (status === "draft") {
      kata = "draft";
      color = "grey";
    }

    if (status === "on progress") {
      if (role === null && signatory_status === null) {
        kata = "on progress";
        color = "yellow";
      }
      if (role === "signer" && signatory_status === "in progress") {
        kata = "waiting for sign";
        color = "yellow";
      }
      if (role === "signer" && signatory_status === "completed") {
        kata = "signed";
        color = "yellow";
      }
      if (role === "reviewer" && signatory_status === "in progress") {
        kata = "waiting for review";
        color = "yellow";
      }
    }
  }
  return {
    kata,
    color,
  };
};

export const recipientStatus = (recipient) => {
  let kata;
  let color;
  const { role, signatory_status, status, is_approve } = recipient;

  if (role === "signer" && signatory_status === "completed") {
    kata = "signed";
    color = "green";
  }
  if (role === "reviewer" && signatory_status === "completed") {
    kata = "reviewed";
    color = "green";
  }
  if (role === "signer" && signatory_status === "in progress") {
    kata = "waiting for sign";
    color = "yellow";
  }
  if (role === "reviewer" && signatory_status === "in progress") {
    kata = "waiting for review";
    color = "yellow";
  }

  if (
    (role === "reviewer" &&
      signatory_status === "rejected" &&
      status === "rejected" &&
      is_approve) ||
    (role === "signer" &&
      signatory_status === "rejected" &&
      status === "rejected" &&
      is_approve)
  ) {
    kata = "rejected";
    color = "red";
  }

  if (
    role === "reviewer" &&
    signatory_status === "in progress" &&
    status === "rejected" &&
    !is_approve
  ) {
    kata = "unreviewed (rejected)";
    color = "red";
  }

  if (
    role === "signer" &&
    signatory_status === "rejected" &&
    status === "rejected" &&
    !is_approve
  ) {
    kata = "unsigned (rejected)";
    color = "red";
  }

  return {
    kata: kata?.toUpperCase(),
    color,
  };
};

export const colorOfItem = (action) => {
  let color;
  if (action === "opened") {
    color = "black";
  } else if (action === "rejected") {
    color = "red";
  } else if (action === "signed" || action === "reviewed") {
    color = "green";
  } else {
    color = "blue";
  }

  return color;
};

// data:application/pdf;base64,
export const convertBase64 = (dataURI) => {
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
};

export const isNoRecipientsForRequestFromOthers = (data) => {
  const owner = data?.recipients?.find(
    (recipient) =>
      recipient?.is_owner === true &&
      recipient?.role === null &&
      recipient?.status === "draft"
  );

  if (owner) {
    return true;
  } else {
    return false;
  }
};
