CREATE proc [dbo].[Locations_Delete_ById]

							@Id int 

/* --Test Code ---
	
	DECLARE @Id int = 1;

	SELECT *
	FROM [dbo].[Locations]
	WHERE Id = @Id

	EXECUTE [dbo].[Locations_DeleteById]	@Id

	SELECT *
	FROM [dbo].[Locations]
	WHERE Id = @Id


*/


AS



BEGIN

	DELETE FROM [dbo].[Locations]
      WHERE Id = @Id

	

END 
GO
