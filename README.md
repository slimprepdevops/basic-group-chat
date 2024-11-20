## Node.js App with Socket.io

This is a simple Node.js application demonstrating real-time communication using Socket.io. It includes both server-side and client-side components for a basic WebSocket-based application.

### Project Structure
```bash
├── README.md          # Project documentation
├── app.js             # Main application file
├── index.html         # Frontend HTML file
├── package-lock.json  # Automatically generated for dependency management
└── package.json       # Project metadata and dependencies

```

### Features
- Real-time communication using Socket.io.
- Minimal server and client setup for learning purposes.
- Fully self-contained for quick setup.

### Setup On Your System (Local)
Follow the steps to setup the application

- Node.js:
    - Ensure that NodeJS is installed, if it is not:
    - Download and install from Node.js [Official Website](https://nodejs.org/).
    - Verify the installation by running the commands below:
    ```bash
    node -v
    npm -v
    ```
    These should return the node versions installed on your machine


- Clone or Download the Project
    - Clone the repository using Git:
    ```bash
    git clone <repository-url>
    ```
    - Alternatively, download and extract the ZIP file.


- Install Dependencies
    - Navigate to the project directory using terminal and install the required packages:
    ```bash
    npm install
    ```

- Run the Application
    ```bash
    node app.js
    ```
    this should run the ap on `*:3000`

- Access the Application
    - Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)

    - you should see this

    ![chat-screen](image.png "Title")

---


### Setup on EC2 Instance

```bash
sudo apt update
```

install nginx

```bash
sudo apt install nginx
```

install node

```bash
sudo apt install nodejs
```

install npm

```bash
sudo apt install npm
```

use npm to install yarn globally

```bash
sudo npm install -g yarn
```

install pm2 globally

```bash
sudo npm install pm2 -g
```

make a directory and clone repo into directory

```bash
mkdir app && cd app && git clone <repositori-url> .
```

run this inside the app directory to install all required dependencies

```bash
npm install
```

Run the application using pm2. this app has their entry point on `app.js`

use pm2 to start the app

```bash
pm2 start app.js
```

you can list the process using 

```bash
pm2 ls
```

configure nginx (this could be ignored if using AWS)

```bash
sudo apt install ufw
sudo ufw allow 'Nginx HTTP'
sudo systemctl start nginx
```

create and update the node app site config

```bash
sudo nano /etc/nginx/sites-available/nodeapp.com
```

update the details with the below

```yaml
server { 
	listen   80; 
    server_name <your_ip_or_domain>; 
 
    location / { 
			proxy_set_header X-Real-IP $remote_addr; 
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
            proxy_set_header Host $host; 
            proxy_set_header X-NginX-Proxy true; 
            proxy_pass http://localhost:3000/; 
            proxy_redirect http://localhost:3000/ https://$server_name/; 
    } 
}
```
notice that the proxy_redirect takes to parameters, one ending with `:3000` and the other ending with `$server_name`, this is one way to setup proxy using nginx. 
The first parameter is the entry point within the node environment, the second one `$server_name` redirects any servername request to the defined port or proxy informaion


```bash
sudo ln -s /etc/nginx/sites-available/nodeapp.com /etc/nginx/sites-enabled/
```

disable existing config

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

test for errors

```bash
sudo nginx -t
```

restart nginx

```bash
sudo systemctl restart nginx
```

the app should be on the live url now

---

### Post Test
you can open the app on different browser to test the communication / live chat between two different browsers or two didferent computer