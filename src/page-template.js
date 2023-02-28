// creates the team
const generateTeam = (team) => {
    // creates the manager html
    const generateManager = (manager) => {
        return `       
        <div class="col">
            <div class="card employee-card h-100 border-light bg-man text-light">
                    <div class="card-header">
                        <h2 class="card-title fw-light">${manager.getName()}</h2>
                        <h3 class="card-title"><i class="fas fa-mug-hot"></i> ${manager.getRole()}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item border-man bg-light bg-gradient text-dark opacity-75">ID: ${manager.getId()}
                                </li>
                            <li class="list-group-item border-man bg-light bg-gradient text-dark opacity-75">
                                Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a>
                            </li>
                            <li class="list-group-item border-man bg-light bg-gradient text-dark opacity-75">
                                Office
                                Number: ${manager.getOfficeNumber()}</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    };

    // creates the html for engineers
    const generateEngineer = (engineer) => {
        return `
        <div class="col">
            <div class="card employee-card h-100 border-light bg-eng text-light">
                <div class="card-header">
                    <h2 class="card-title fw-light">${engineer.getName()}</h2>
                    <h3 class="card-title"><i class="fas fa-glasses"></i> ${engineer.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item border-eng bg-light bg-gradient text-dark opacity-75">ID:
                        ${engineer.getId()}</li>
                        <li class="list-group-item border-eng bg-light bg-gradient text-dark opacity-75">
                            Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a>
                        </li>
                        <li class="list-group-item border-eng bg-light bg-gradient text-dark opacity-75">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    };

    // creates the html for interns
    const generateIntern = (intern) => {
        return `
        <div class="col">
            <div class="card employee-card h-100 border-light bg-int text-light">
                <div class="card-header">
                    <h2 class="card-title fw-light">${intern.getName()}</h2>
                    <h3 class="card-title"><i class="fas fa-user-graduate"></i> ${intern.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item border-int bg-light bg-gradient text-dark opacity-75">ID:
                        ${intern.getId()}</li>
                        <li class="list-group-item border-int bg-light bg-gradient text-dark opacity-75">
                            Email: <a href="${intern.getEmail()}">${intern.getEmail()}</a>
                        </li>
                        <li class="list-group-item list-group-item border-int bg-light bg-gradient text-dark opacity-75">School: ${intern.getSchool()}</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    };

    const html = [];

    html.push(
        team
            .filter((employee) => employee.getRole() === 'Manager')
            .map((manager) => generateManager(manager))
            .join('')
    );
    html.push(
        team
            .filter((employee) => employee.getRole() === 'Engineer')
            .map((engineer) => generateEngineer(engineer))
            .join('')
    );
    html.push(
        team
            .filter((employee) => employee.getRole() === 'Intern')
            .map((intern) => generateIntern(intern))
            .join('')
    );

    return html.join('');
};

// exports function to generate entire page
const render = (team) => {
    return `
        <!DOCTYPE html>
        <html lang="en">    
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>My Team</title>
            <!-- new -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap" rel="stylesheet">
            <!-- new -->
            <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> -->
            <link rel="stylesheet" href="style.css">
            <script src="https://kit.fontawesome.com/c502137733.js"></script>
        </head>
        
        <body>
            <header class="container-fluid bg-dark bg-gradient">
                <div class="row">
                    <div class="col jumbotron py-5 team-heading">
                        <h1 class="text-center fc-clr5">My Team</h1>
                    </div>
                </div>
            </header>
            <main class="bg-black">
                <section class="container team-area py-5">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 g-lg-3 team-area">
                    ${generateTeam(team)}
                    </div>
                    </section>
                </main>
                <footer class="bg-dark bg-gradient">
                    <p class="text-center text-light">© 2023</p>
                </footer>
            
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
            </body>        
        </html>
    `;
};

export { render };
