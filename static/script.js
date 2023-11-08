const onClick = (id, callback) => {
    const element = document.getElementById(id);

    element.addEventListener("click", callback);
}

const redirect = (id, url) => {
    onClick(id, (e) => {
        if (e.button == 0) {
            window.location.href = url;
        }
    });
}

window.onload = function() {
    redirect("order-now", "/order");
}