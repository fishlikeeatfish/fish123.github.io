// 初始化加载保存的名单
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        // 处理CSV文件（逗号分隔）
        const names = file.name.endsWith('.csv') 
            ? content.split(/[,\n]/).filter(n => n.trim())
            : content.split('\n').filter(n => n.trim());
            
        document.getElementById('nameList').value = names.join('\n');
        showMatrixEffect(`✅ 已加载 ${names.length} 个量子签名`);
    };
    reader.onerror = function() {
        showMatrixEffect('⚠ 文件读取失败！');
    };
    reader.readAsText(file);
}

window.onload = () => {
    const savedList = localStorage.getItem('classList');
    if(savedList) document.getElementById('nameList').value = savedList;
};

function saveList() {
    const list = document.getElementById('nameList').value;
    localStorage.setItem('classList', list);
    showMatrixEffect('✅ 名单已保存至量子存储器');
}

function startDraw() {
    const names = document.getElementById('nameList').value.split('\n').filter(n => n.trim());
    if(names.length === 0) {
        showMatrixEffect('⚠ 请先输入抽签名单！');
        return;
    }

    // 创建数字雨效果
    const display = document.getElementById('randomDisplay');
    display.innerHTML = '';
    createMatrixEffect(display);

    // 开始随机抽选
    let counter = 0;
    const maxLoop = 20;
    const interval = setInterval(() => {
        if(counter++ > maxLoop) {
            clearInterval(interval);
            showFinalResult(names);
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * names.length);
        display.textContent = names[randomIndex];
        display.style.color = `hsl(${Math.random()*360}, 100%, 70%)`;
    }, 100);
}

function createMatrixEffect(container) {
    for(let i=0; i<20; i++) {
        const span = document.createElement('span');
        span.style.animation = `matrixFall ${Math.random()*2+1}s linear infinite`;
        span.textContent = Math.random().toString(16).substr(2,8);
        container.appendChild(span);
    }
}

function showFinalResult(names) {
    const result = document.getElementById('finalResult');
    let winner;
    do {
        winner = names[Math.floor(Math.random() * names.length)];
    } while (winner === '余智辰');

    if (winner === '欧阳栋') {
        winner = '欧阳栋（26❤？？）';
        // 播放音频
        const audio = new Audio('fireworks.mp3'); // 请确保该音频文件存在
        audio.play();
        
    }
    
    result.textContent = `✨ 量子纠缠选定：${winner}`;
    result.style.animation = 'neonPulse 0.8s infinite alternate';

    // 添加庆祝特效
    for(let i=0; i<50; i++) {
        createConfetti();
    }
}




function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: hsl(${Math.random()*360}, 100%, 50%);
        animation: confettiFall ${Math.random()*2+1}s linear;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 2000);
}

function showMatrixEffect(text) {
    const display = document.getElementById('randomDisplay');
    display.innerHTML = text;
    display.style.color = '#0f0';
    setTimeout(() => display.innerHTML = '', 1500);
}

// 动态样式
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixFall {
        from { transform: translateY(-100px) rotate(15deg); }
        to { transform: translateY(100px) rotate(-15deg); opacity: 0; }
    }
    
    @keyframes confettiFall {
        from { transform: translateY(-100vh) rotate(0deg); }
        to { transform: translateY(100vh) rotate(720deg); }
    }
`;
document.head.appendChild(style);