<script>
    import { Stage, Layer, Label, Tag, Text, Circle } from "svelte-konva";

    let circles = [];

    const COLORS = [
        "black",
        "green",
        "blue",
        "red",
        "yellow",
        "magenta",
        "cyan",
        "purple",
        "orange",
        "pink",
    ];

    for (let i = 0; i < 10; i++) {
        circles[i] = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: 60 * Math.random() + 20,
            fill: COLORS[i],
            name: COLORS[i],
        };
    }

    let labelConfig = {
        x: 0,
        y: 0,
        opacity: 0.8,
        visible: false,
    };

    let labelTextConfig = {
        text: "",
        fontSize: 18,
        padding: 5,
        fill: "white",
    };

    function handleMouseEnter(e) {
        const konvaEvent = e.detail;

        let hoveredElementPos = konvaEvent.target.getPosition();
        let hoveredElementRadius = konvaEvent.target.attrs.radius;
        let hoveredElementName = konvaEvent.target.attrs.name;

        labelConfig.x = hoveredElementPos.x;
        labelConfig.y = hoveredElementPos.y - hoveredElementRadius;

        labelTextConfig.text = hoveredElementName;

        labelConfig.visible = true;
    }

    function handleMouseLeave() {
        labelConfig.visible = false;
    }
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
    <Layer>
        {#each circles as config}
            <Circle
                {config}
                on:mouseenter={handleMouseEnter}
                on:mouseleave={handleMouseLeave}
            />
        {/each}

        <Label config={labelConfig}>
            <Tag
                config={{
                    fill: "black",
                    pointerDirection: "down",
                    pointerWidth: 10,
                    pointerHeight: 10,
                    lineJoin: "round",
                    shadowColor: "black",
                    shadowBlur: 10,
                    shadowOffsetX: 10,
                    shadowOffsetY: 10,
                    shadowOpacity: 0.5,
                }}
            />
            <Text config={labelTextConfig} />
        </Label>
    </Layer>
</Stage>
