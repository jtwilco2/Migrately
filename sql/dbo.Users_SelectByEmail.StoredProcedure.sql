CREATE proc [dbo].[Users_SelectByEmail]
			@Email nvarchar(255)

/*
Declare @Email nvarchar(255) = 'sabioadmin11@dispostable.com'

Execute dbo.Users_SelectByEmail	@Email
		
*/

AS

BEGIN

		SELECT u.[Id] as UserId
			,[FirstName]
			,[Mi]
			,[LastName]			
			,[AvatarUrl]
			,[Email]
			,st.Id
			,st.[Name] as Status
			,Role = (
						Select	r.Id
								,r.Name
						From dbo.Roles as r inner join dbo.UserRoles as ur
								on r.Id = ur.RoleId
						Where u.Id = ur.UserId
						For JSON AUTO
			)
			FROM [dbo].[Users] as u inner join dbo.StatusTypes as st
							on u.StatusId = st.Id
			WHERE u.Email = @Email

END
GO
