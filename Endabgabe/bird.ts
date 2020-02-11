namespace endabgabe {
    export class Bird extends Moveable {


        constructor() {
            super();

            let xBird: number = (3 * Math.random()) + 3;



            this.velocity = new Vector(xBird, 0);
        }


        draw(): void {

            crc2.save();
            crc2.beginPath();
            crc2.translate(this.position.x, this.position.y);
            crc2.ellipse(0, 0, 10, 20, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(18, 2, 10, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(20, 0, 2, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.closePath();

            crc2.scale(7, 8);
            crc2.translate(-1, -1);
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(2, -3);
            crc2.lineTo(2, 2);
            crc2.closePath();
            crc2.fillStyle = "red";
            crc2.fill();

            crc2.beginPath();
            crc2.moveTo(4.5, 0.5);
            crc2.lineTo(6.5, 1.5);
            crc2.lineTo(4.5, 2);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();



            crc2.restore();
        }
        isHit(_hotspot: Vector): boolean {
            let hitsize: number = 32;
            let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);

        }
        isFoodNear(_hotspot: Vector): boolean {

            let foodSize: number = 200;

            let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < foodSize && Math.abs(difference.y) < foodSize);

        }
        moveToFood(): void {
            let ySnow: Vector = new Vector(0, 0);
            ySnow.random(1, 1);
            
            this.position.add(ySnow);
        }


    }
}