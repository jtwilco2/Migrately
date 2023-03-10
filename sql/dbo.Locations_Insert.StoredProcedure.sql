CREATE proc [dbo].[Locations_Insert]

			@LocationTypeId int
           ,@LineOne nvarchar(255)
           ,@LineTwo nvarchar(255)
           ,@City nvarchar(255)
           ,@Zip nvarchar(50)
           ,@StateId int
           ,@Latitude float
           ,@Longitude float
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int OUTPUT


/*------ TEST CODE ------

		Declare @Id int = 0;

		Declare @LocationTypeId int = 1
           ,@LineOne nvarchar(255) = 'LineOne new'
           ,@LineTwo nvarchar(255) = 'LineTwo new '
           ,@City nvarchar(255) = 'City'
           ,@Zip nvarchar(50) = '91342'
           ,@StateId int = 1
           ,@Latitude float = 40.12
           ,@Longitude float = 50.12
           ,@CreatedBy int = 1
           ,@ModifiedBy int = 1
		
		Execute dbo.Locations_Insert
								@LocationTypeId 
							   ,@LineOne 
							   ,@LineTwo 
							   ,@City 
							   ,@Zip 
							   ,@StateId 
							   ,@Latitude 
							   ,@Longitude 
							   ,@CreatedBy 
							   ,@ModifiedBy 
							   ,@Id OUTPUT
		SELECT *
		FROM [dbo].[Locations]
		WHERE Id = @Id


*/

	
	
as


BEGIN

INSERT INTO [dbo].[Locations]
           ([LocationTypeId]
           ,[LineOne]
           ,[LineTwo]
           ,[City]
           ,[Zip]
           ,[StateId]
           ,[Latitude]
           ,[Longitude]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
           (@LocationTypeId
           ,@LineOne
           ,@LineTwo
           ,@City
           ,@Zip
           ,@StateId
           ,@Latitude
           ,@Longitude
           ,@CreatedBy
           ,@ModifiedBy)

	SET @Id = SCOPE_IDENTITY()


END
GO
