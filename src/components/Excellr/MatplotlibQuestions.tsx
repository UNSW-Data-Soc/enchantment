// src/components/MatplotlibQuestions.jsx
import React, { useState } from 'react';

const questions = [
  {
    key: "create-line-plot",
    title: "1. Create a Simple Line Plot",
    task: "How do you create a simple line plot using Matplotlib?",
    concepts: "Basic plotting, Figure and Axes",
    description: "Line plots are fundamental for visualizing trends over time or ordered categories. They connect data points with straight lines, making them ideal for showing continuous data.",
    example: "Visualizing stock prices over time, temperature changes through a day, or population growth over years.",
    code: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title("Simple Line Plot")
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.show()`
  },
  {
    key: "scatter-plot",
    title: "2. Create a Scatter Plot",
    task: "How do you create a scatter plot to visualize the relationship between two variables?",
    concepts: "Scatter plots, Marker customization",
    description: "Scatter plots display values for two variables as points on a 2D plane, excellent for showing relationships or correlations between variables.",
    example: "Height vs. weight of individuals, temperature vs. ice cream sales, or engine size vs. car mileage.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.random.rand(50)
y = np.random.rand(50)

plt.scatter(x, y)
plt.title("Scatter Plot")
plt.xlabel("X values")
plt.ylabel("Y values")
plt.show()`
  },
  {
    key: "bar-chart",
    title: "3. Create a Bar Chart",
    task: "How do you create a bar chart to compare different categories?",
    concepts: "Bar plots, Categorical data",
    description: "Bar charts represent categorical data with rectangular bars, where the length represents the value. Great for comparisons between discrete categories.",
    example: "Sales by product category, population by country, or votes by political party.",
    code: `import matplotlib.pyplot as plt

categories = ['A', 'B', 'C', 'D']
values = [15, 20, 12, 25]

plt.bar(categories, values)
plt.title("Bar Chart Example")
plt.xlabel("Categories")
plt.ylabel("Values")
plt.show()`
  },
  {
    key: "histogram",
    title: "4. Create a Histogram",
    task: "How do you create a histogram to show the distribution of a dataset?",
    concepts: "Histograms, Bins, Distribution",
    description: "Histograms show the distribution of numerical data by dividing it into bins and counting observations in each bin.",
    example: "Age distribution in a population, distribution of test scores, or income distribution.",
    code: `import matplotlib.pyplot as plt
import numpy as np

data = np.random.normal(170, 10, 250)

plt.hist(data, bins=20, edgecolor='black')
plt.title("Height Distribution")
plt.xlabel("Height (cm)")
plt.ylabel("Frequency")
plt.show()`
  },
  {
    key: "box-plot",
    title: "5. Create a Box Plot",
    task: "How do you create a box plot to show the distribution and outliers of a dataset?",
    concepts: "Box plots, Quartiles, Outliers",
    description: "Box plots (or whisker plots) show the distribution of data through quartiles, highlighting median, outliers, and data spread.",
    example: "Comparing test scores across different schools, analyzing salary distributions by job type.",
    code: `import matplotlib.pyplot as plt
import numpy as np

data = [np.random.normal(0, std, 100) for std in range(1, 4)]

plt.boxplot(data, vert=True, patch_artist=True)
plt.title("Box Plot Example")
plt.xlabel("Groups")
plt.ylabel("Values")
plt.show()`
  },
  {
    key: "pie-chart",
    title: "6. Create a Pie Chart",
    task: "How do you create a pie chart to show proportional data?",
    concepts: "Pie charts, Percentages",
    description: "Pie charts show proportions of a whole as slices of a circle. Best for showing simple part-to-whole relationships with few categories.",
    example: "Market share of companies, budget allocation, or survey response percentages.",
    code: `import matplotlib.pyplot as plt

labels = ['A', 'B', 'C', 'D']
sizes = [15, 30, 45, 10]
colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']

plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%')
plt.axis('equal')
plt.title("Pie Chart Example")
plt.show()`
  },
  {
    key: "multiple-plots",
    title: "7. Plot Multiple Subplots",
    task: "How do you create multiple subplots in a single figure?",
    concepts: "Subplots, Figure layout",
    description: "Subplots allow multiple plots in a single figure, useful for comparing related datasets or different views of the same data.",
    example: "Showing temperature, pressure, and humidity on separate subplots for the same time period.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2*np.pi, 400)
y1 = np.sin(x)
y2 = np.cos(x)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6))
fig.suptitle('Trigonometric Functions')

ax1.plot(x, y1, 'r')
ax1.set_title('Sine')
ax2.plot(x, y2, 'b')
ax2.set_title('Cosine')

plt.tight_layout()
plt.show()`
  },
  {
    key: "customize-plot",
    title: "8. Customize Plot Appearance",
    task: "How do you customize plot elements like titles, labels, and legends?",
    concepts: "Plot customization, Styling",
    description: "Matplotlib offers extensive customization options for colors, styles, labels, and other visual elements to make plots more informative and visually appealing.",
    example: "Adding grid lines, changing line styles, customizing fonts, or adding a legend.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue', linestyle='--', linewidth=2)
plt.title("Customized Plot", fontsize=16, fontweight='bold')
plt.xlabel("X values", fontsize=14)
plt.ylabel("Y values", fontsize=14)
plt.legend(fontsize=12, loc='upper right')
plt.grid(True, linestyle='--', alpha=0.7)
plt.show()`
  },
  {
    key: "add-annotations",
    title: "9. Add Annotations to a Plot",
    task: "How do you add text annotations to specific points on a plot?",
    concepts: "Annotations, Text on plots",
    description: "Annotations help highlight specific points or add explanatory text to make plots more informative. They can include arrows, text boxes, and other markers.",
    example: "Marking significant events on a timeline, highlighting outliers, or explaining peaks in a graph.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Annotated Plot")

max_y = max(y)
max_x = x[np.argmax(y)]
plt.annotate('Maximum', xy=(max_x, max_y), xytext=(max_x+1, max_y-0.2),
             arrowprops=dict(facecolor='black', shrink=0.05),
             fontsize=12)

plt.text(2, 0.5, 'Important Region', fontsize=12, 
         bbox=dict(facecolor='yellow', alpha=0.5))
plt.show()`
  },
  {
    key: "log-scale",
    title: "10. Use Log Scale for Axes",
    task: "How do you set a logarithmic scale for the x or y axis?",
    concepts: "Logarithmic scales, Axis scaling",
    description: "Logarithmic scales are useful when data spans several orders of magnitude. They compress large values and expand small ones to reveal patterns in wide-ranging data.",
    example: "Visualizing earthquake magnitudes, population growth, or frequency response in electronics.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(1, 1000, 100)
y = x**3

plt.plot(x, y)
plt.yscale('log')
plt.xscale('log')
plt.title("Log-Log Scale Plot")
plt.xlabel("X (log scale)")
plt.ylabel("Y (log scale)")
plt.show()`
  },
  {
    key: "error-bars",
    title: "11. Add Error Bars to a Plot",
    task: "How do you add error bars to represent uncertainty in measurements?",
    concepts: "Error bars, Uncertainty visualization",
    description: "Error bars show the variability of data and can represent standard deviation, standard error, confidence intervals, or min/max values.",
    example: "Showing measurement uncertainty in scientific experiments, confidence intervals in survey results.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.arange(5)
y = [2, 4, 6, 8, 10]
error = [0.5, 1, 1.5, 2, 2.5]

plt.errorbar(x, y, yerr=error, fmt='o', capsize=5)
plt.title("Plot with Error Bars")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()`
  },
  {
    key: "twin-axes",
    title: "12. Create a Twin Axes Plot",
    task: "How do you create a plot with two y-axes sharing the same x-axis?",
    concepts: "Twin axes, Multiple scales",
    description: "Twin axes plots allow visualization of two different variables with different scales on the same plot, sharing a common x-axis.",
    example: "Showing temperature and precipitation on the same time series plot, or price and volume in stock market data.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.1)
y1 = np.sin(x)
y2 = np.cos(x) * 100

fig, ax1 = plt.subplots()
ax1.plot(x, y1, 'b-')
ax1.set_xlabel('X')
ax1.set_ylabel('sin(x)', color='b')

ax2 = ax1.twinx()
ax2.plot(x, y2, 'r-')
ax2.set_ylabel('100*cos(x)', color='r')

plt.title("Twin Axes Plot")
plt.show()`
  },
  {
    key: "3d-plot",
    title: "13. Create a 3D Plot",
    task: "How do you create a three-dimensional plot?",
    concepts: "3D plotting, mplot3d toolkit",
    description: "3D plots visualize data in three dimensions, useful for showing relationships between three variables or surfaces.",
    example: "Visualizing terrain elevation, molecular structures, or complex mathematical functions.",
    code: `import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

ax.plot_surface(X, Y, Z)
ax.set_title("3D Surface Plot")
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
plt.show()`
  },
  {
    key: "save-plot",
    title: "14. Save a Plot as an Image",
    task: "How do you save a Matplotlib figure to an image file?",
    concepts: "File export, Image formats",
    description: "Saving plots allows you to use them in reports, presentations, or web applications with various file formats available.",
    example: "Exporting charts for academic papers, saving visualizations for dashboards, or creating plot galleries.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Plot to Save")
plt.xlabel("X")
plt.ylabel("sin(X)")

plt.savefig('sine_wave.png', dpi=300, bbox_inches='tight')
plt.show()`
  },
  {
    key: "interactive-plot",
    title: "15. Create an Interactive Plot",
    task: "How do you create an interactive plot that responds to user input?",
    concepts: "Interactive plotting, Event handling",
    description: "Interactive plots allow users to zoom, pan, or click on elements to get more information, enhancing data exploration.",
    example: "Creating exploratory data analysis tools, building interactive dashboards, or making educational visualizations.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Interactive Plot (try zooming/panning)")
plt.xlabel("X")
plt.ylabel("sin(X)")

plt.show()  # In Jupyter notebook or with appropriate backend, this will be interactive`
  },
  {
    key: "plot-styling",
    title: "16. Use Different Plot Styles",
    task: "How do you change the overall style of your plots (e.g., ggplot style)?",
    concepts: "Plot styles, Aesthetics",
    description: "Matplotlib provides several built-in styles that change the overall look of plots to match different aesthetic preferences or publication requirements.",
    example: "Creating publication-quality figures, matching corporate design guidelines, or quickly trying different visual styles.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.style.use('ggplot')
plt.plot(x, y)
plt.title("Plot with ggplot Style")
plt.xlabel("X")
plt.ylabel("sin(X)")
plt.show()`
  },
  {
    key: "animated-plot",
    title: "17. Create an Animated Plot",
    task: "How do you create an animation that shows changes over time?",
    concepts: "Animation, FuncAnimation",
    description: "Animations can show how data evolves over time or how parameters affect a model, making dynamic processes easier to understand.",
    example: "Showing wave propagation, demonstrating algorithm progress, or visualizing time-series data changes.",
    code: `import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np

fig, ax = plt.subplots()
x = np.linspace(0, 2*np.pi, 100)
line, = ax.plot(x, np.sin(x))

def update(frame):
    line.set_ydata(np.sin(x + frame/10))
    return line,

ani = FuncAnimation(fig, update, frames=100, interval=50)
plt.title("Sine Wave Animation")
plt.show()`
  },
  {
    key: "heatmap",
    title: "18. Create a Heatmap",
    task: "How do you create a heatmap to visualize matrix-like data?",
    concepts: "Heatmaps, Color mapping",
    description: "Heatmaps use color to represent values in a matrix, making patterns and variations in large datasets easily visible.",
    example: "Visualizing correlation matrices, gene expression data, or geographical data distributions.",
    code: `import matplotlib.pyplot as plt
import numpy as np

data = np.random.rand(10, 10)

plt.imshow(data, cmap='hot', interpolation='nearest')
plt.colorbar()
plt.title("Heatmap Example")
plt.show()`
  },
  {
    key: "violin-plot",
    title: "19. Create a Violin Plot",
    task: "How do you create a violin plot that shows the distribution of data?",
    concepts: "Violin plots, Distribution visualization",
    description: "Violin plots combine aspects of box plots and kernel density estimation to show the distribution of data across categories.",
    example: "Comparing distributions of test scores across different schools, analyzing salary distributions by job type.",
    code: `import matplotlib.pyplot as plt
import numpy as np

data = [np.random.normal(0, std, 100) for std in range(1, 4)]

plt.violinplot(data)
plt.title("Violin Plot Example")
plt.xlabel("Groups")
plt.ylabel("Values")
plt.show()`
  },
  {
    key: "stem-plot",
    title: "20. Create a Stem Plot",
    task: "How do you create a stem plot to show discrete data points?",
    concepts: "Stem plots, Discrete data",
    description: "Stem plots display discrete data points with lines extending from a baseline, useful for emphasizing individual values in a sequence.",
    example: "Visualizing digital signal processing results, showing discrete event occurrences, or displaying quantized measurements.",
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.1, 2*np.pi, 20)
y = np.cos(x)

plt.stem(x, y)
plt.title("Stem Plot Example")
plt.xlabel("X")
plt.ylabel("cos(X)")
plt.show()`
  }
];

const MatplotlibQuestions = () => {
  const [selected, setSelected] = useState('create-line-plot');
  const selectedQuestion = questions.find(q => q.key === selected);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className=" bg-purple-100 text-black font-semibold rounded-lg shadow-md px-8 py-4 mx-4 my-8 w-full max-w-xs">
      <h2 className="mb-4 text-lg font-semibold">Matplotlib practice questions</h2>
        <ul className="mt-10 space-y-2">
          {questions.map((question) => (
            <li 
              key={question.key}
              className={`cursor-pointer hover:text-purple-700 ${selected === question.key ? 'font-bold text-purple-800' : ''}`}
              onClick={() => setSelected(question.key)}
            >
              {question.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        {selectedQuestion && (
          <div>
            <h2 className="mb-4 text-xl font-bold">{selectedQuestion.title}</h2>
            <p className="mb-2 text-lg"><strong>Task:</strong> {selectedQuestion.task}</p>
            <p className="mb-2"><strong>Concepts:</strong> {selectedQuestion.concepts}</p>
            <p className="mb-2"><strong>Description:</strong> {selectedQuestion.description}</p>
            <p className="mb-2"><strong>Example:</strong> {selectedQuestion.example}</p>
            
            <pre className="bg-gray-100 p-4 rounded mb-4">
              {selectedQuestion.code}
            </pre>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default MatplotlibQuestions;