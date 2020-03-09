import TypeWriter from "./TypeWriter";

const commands = [
    "python3 -c \"print(\\\"Hello World!\\\")\"",
    "sudo apt install vim",
    "ls -la",
    "cd /etc/",
    "rm -R project",
    "tar xf file.tar",
    "ifconfig >> file.txt",
    "sudo make install",
    "vim ~/.vimrc",
    "sudo chmod 755 file.sh",
    "passwd --delete user2",
    "su - user2",
    "apt list | grep g++",
    "git commit -m \"New Patch\"",
    "sudo bash",
    "man iwconfig",
    "tmux attach-session -t bash_session",
    "sudo service apache2 start",
    "sudo apt-get upgrade",
    "whoami",
    "pwd",
    "grep -i \"ten\" numeric.txt",
    "sudo alias helloworld='echo \"Hello World!\"'",
    "stress --cpu 8 --timeout 300s",
    "openssl speed des des-ede3 dsa2048 hmac idea-cbc md5 aes-256-cbc",
    "openssl aes-256-cbc -salt -pbkdf2 -in private.txt -out enc.bin"
];

const input = document.getElementById("input");
const ibeam = document.getElementById("ibeam");
const center = document.getElementById("center");

const tw = new TypeWriter(input);
tw.writeTextRandom(commands, 1000, 3000, 90, 0.45);

tw.onbegintexting = deactivateCursorIdle;
tw.onbeginremoving = deactivateCursorIdle;
tw.onendremoving = activateCursorIdle;
tw.onendtexting = () => {
    center.classList.add("typed");
    activateCursorIdle();
};

function activateCursorIdle() {
    ibeam.classList.add("idle");
}

function deactivateCursorIdle() {
    ibeam.classList.remove("idle");
    center.classList.remove("typed");
}