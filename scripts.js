document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.start-exercise-btn').forEach(button => {
        button.addEventListener('click', event => {
            const exerciseContainer = event.target.closest('.exercise');
            const timerContainer = exerciseContainer.querySelector('.timer-container');
            const timerElement = timerContainer.querySelector('.timer p');
            const stopButton = timerContainer.querySelector('.stop-exercise-btn');
            const messageElement = exerciseContainer.querySelector('.completion-message');
            let duration = parseInt(event.target.getAttribute('data-duration'), 10);
            let remainingTime = duration;
            let interval;

            timerContainer.style.display = 'flex';
            event.target.style.display = 'none';
            stopButton.style.display = 'block';

            function startTimer() {
                interval = setInterval(() => {
                    if (remainingTime <= 0) {
                        clearInterval(interval);
                        stopButton.style.display = 'none';
                        messageElement.style.display = 'block';
                        return;
                    }
                    remainingTime--;
                    timerElement.textContent = formatTime(remainingTime);
                }, 1000);
            }

            startTimer();

            stopButton.addEventListener('click', function stopFunction() {
                clearInterval(interval);
                stopButton.style.display = 'none';
                showResumeButton(exerciseContainer, remainingTime);
                stopButton.removeEventListener('click', stopFunction); // Remove event listener to prevent multiple bindings
            });
        });
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function showResumeButton(exerciseContainer, remainingTime) {
        const resumeButton = document.createElement('button');
        resumeButton.textContent = 'Продовжити';
        resumeButton.className = 'resume-exercise-btn';
        exerciseContainer.appendChild(resumeButton);

        resumeButton.addEventListener('click', () => {
            resumeButton.remove();
            const timerContainer = exerciseContainer.querySelector('.timer-container');
            const timerElement = timerContainer.querySelector('.timer p');
            const stopButton = timerContainer.querySelector('.stop-exercise-btn');
            const messageElement = exerciseContainer.querySelector('.completion-message');

            stopButton.style.display = 'block';
            messageElement.style.display = 'none';

            function startTimer() {
                interval = setInterval(() => {
                    if (remainingTime <= 0) {
                        clearInterval(interval);
                        stopButton.style.display = 'none';
                        messageElement.style.display = 'block';
                        return;
                    }
                    remainingTime--;
                    timerElement.textContent = formatTime(remainingTime);
                }, 1000);
            }

            startTimer();

            stopButton.addEventListener('click', function stopFunction() {
                clearInterval(interval);
                stopButton.style.display = 'none';
                showResumeButton(exerciseContainer, remainingTime);
                stopButton.removeEventListener('click', stopFunction); // Remove event listener to prevent multiple bindings
            });
        });
    }
});
