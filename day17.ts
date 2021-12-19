type SimulationResult = {
    passesThroughTarget: boolean,
    maxY: number
}

export function simulateFire(x: number,
                             y: number,
                             minTargetX: number,
                             maxTargetX: number,
                             minTargetY: number,
                             maxTargetY: number): SimulationResult {
    let steps = 0;
    let xPos = 0;
    let yPos = 0;
    let xVel = x;
    let yVel = y;
    let maxY = 0;
    let passesThroughTarget = false;
    while (xPos <= maxTargetX && yPos >= minTargetY) {
        steps += 1;
        xPos += xVel;
        yPos += yVel;
        maxY = Math.max(yPos, maxY)
        xVel = Math.max(xVel - 1, 0);
        yVel -= 1;
        if (xPos >= minTargetX && xPos <= maxTargetX && yPos >= minTargetY && yPos <= maxTargetY) {
            passesThroughTarget = true;
        }
    }

    return {
        passesThroughTarget: passesThroughTarget,
        maxY: maxY
    };
}

export function maximizeY(minTargetX: number, maxTargetX: number, minTargetY: number, maxTargetY: number,): number {
    let maxY = 0;
    for (let x = 0; x < maxTargetX; x++) {
        for (let y = minTargetY; y < Math.abs(minTargetY); y++) {
            let res = simulateFire(x, y, minTargetX, maxTargetX, minTargetY, maxTargetY);
            if (res.passesThroughTarget) {
                maxY = Math.max(res.maxY, maxY);
            }
        }
    }

    return maxY;
}

export function countInitialVelocities(minTargetX: number, maxTargetX: number, minTargetY: number, maxTargetY: number,): number {
    let count = 0;
    for (let x = 0; x <= maxTargetX; x++) {
        for (let y = minTargetY; y <= Math.abs(minTargetY); y++) {
            let res = simulateFire(x, y, minTargetX, maxTargetX, minTargetY, maxTargetY);
            if (res.passesThroughTarget) {
                count++;
            }
        }
    }

    return count;
}