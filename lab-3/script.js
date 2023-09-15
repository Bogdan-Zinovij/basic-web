class Store {
    users = [];

    async getUsers(usersCount) {
        try {
            const res = await fetch(
                `https://randomuser.me/api/?results=${usersCount}`
            );
            const data = await res.json();
            this.users = data.results;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to get users, try again");
        }
    }

    getNumberOfUsers() {
        return this.users.length;
    }
}

class UsersView {
    refs = {
        numberOfUsersInput: document.querySelector("#numberOfUsersToLoad"),
        usersContainer: document.querySelector(".users-list"),
        loadBtn: document.querySelector(".load-btn"),
        message: document.querySelector(".message"),
    };

    constructor(store) {
        this.store = store;

        this.refs.loadBtn.addEventListener(
            "click",
            this.handleLoadBtnClick.bind(this)
        );
    }

    renderUsers() {
        const markup = this.store.users
            .map((user) => {
                return `
        <li class="user-item">
          <img
            class="user-item__img"
            src="${user.picture.medium}"
            alt="user picture"
          />
          <p class="user-item__detail">City: ${user.location.city}</p>
          <p class="user-item__detail">Postcode: ${user.location.postcode}</p>
          <p class="user-item__detail">Cell: ${user.cell}</p>
          <p class="user-item__detail">Name: ${
              user.name.first + " " + user.name.last
          }</p>
        </li>`;
            })
            .join("");

        this.refs.usersContainer.insertAdjacentHTML("afterbegin", markup);
    }

    clearElements(...elements) {
        elements.forEach((element) => {
            element.innerHTML = "";
        });
    }

    async handleLoadBtnClick() {
        try {
            this.clearElements(this.refs.message, this.refs.usersContainer);
            const numberOfUsers = this.refs.numberOfUsersInput.value;

            await this.store.getUsers(numberOfUsers);

            this.renderUsers();
            this.refs.message.textContent = `Successfully loaded ${this.store.getNumberOfUsers()} users`;
        } catch (err) {
            this.refs.message.textContent = err.message;
        }
    }
}

const usersView = new UsersView(new Store());
